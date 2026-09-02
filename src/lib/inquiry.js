// ============================================================================
// Maps a form submission onto the `public.inquiries` row shape.
//
// This is the contract between the React forms and the database defined in
// db/001-inquiries.sql. It is deliberately a pure function with no network or
// provider knowledge, so the mapping can be read, reasoned about and tested on
// its own — and so swapping the delivery provider never touches it.
//
// TWO RULES THIS FILE EXISTS TO ENFORCE
//
// 1. Only ever emit the eleven columns `anon` is granted INSERT on. PostgREST
//    rejects a payload containing any column the caller cannot write, so an
//    extra key here turns every submission into a 400.
//
// 2. Always emit `website` and `elapsed_ms`. They are the two anti-spam
//    signals: the honeypot (dropped silently by the table's BEFORE INSERT
//    trigger) and the time-on-form. Omitting the honeypot when it is empty
//    would make the trap detectable from the payload shape alone.
// ============================================================================

// Form field id -> database column. The ids are the `id` attributes on each
// <Field>, which is also how useForm keys its values.
const FIELD_MAP = {
  contact: {
    "c-name": "name",
    "c-email": "email",
    "c-phone": "phone",
    "c-topic": "topic",
    "c-message": "message",
  },
  volunteer: {
    "v-name": "name",
    "v-email": "email",
    "v-phone": "phone",
    "v-availability": "availability",
    "v-interests": "interests",
    "v-note": "notes",
  },
  newsletter: {
    "nl-name": "name",
    "nl-email": "email",
  },
};

export const SUPPORTED_FORMS = Object.keys(FIELD_MAP);

function clean(value) {
  return typeof value === "string" ? value.trim() : value;
}

/**
 * Build the row to POST to PostgREST.
 *
 * @param {string} formName  one of SUPPORTED_FORMS
 * @param {object} values    useForm's values object, keyed by field id
 * @returns {object}         a row containing only grantable columns
 * @throws {Error}           on an unknown form name — a programming error, not
 *                           user input, so it should fail loudly and early
 */
export function buildInquiryRow(formName, values) {
  const map = FIELD_MAP[formName];
  if (!map) {
    throw new Error(`Unknown form "${formName}"`);
  }

  // Always present: identifies the form, and carries both spam signals.
  const row = {
    form_type: formName,
    website: values.website ?? "",
    elapsed_ms: Number.isFinite(values.elapsedMs) ? values.elapsedMs : null,
  };

  for (const [fieldId, column] of Object.entries(map)) {
    const value = clean(values[fieldId]);

    if (Array.isArray(value)) {
      // Empty array and "not answered" mean the same thing; let the column be
      // absent so NULL is the single representation of "nothing selected".
      if (value.length) row[column] = value;
      continue;
    }

    // Omit blank optionals rather than sending empty strings, so the database
    // stores NULL rather than ''. Required fields are enforced by the form,
    // and again by CHECK constraints in the migration.
    if (value !== undefined && value !== null && value !== "") {
      row[column] = value;
    }
  }

  return row;
}
