import { AlertCircle } from "lucide-react";
import styles from "./forms.module.css";

// Accessible labelled field. Controlled when `value`/`onChange` are provided.
// Shows a validation message tied to the control via aria-describedby, and sets
// aria-invalid when errored. Renders textarea/select/input as appropriate.
export function Field({
  id,
  label,
  type = "text",
  required = false,
  textarea = false,
  options,
  value,
  onChange,
  onBlur,
  error,
  ...rest
}) {
  const errId = `${id}-error`;
  const controlProps = {
    id,
    name: id,
    required,
    className: styles.control,
    value,
    onChange,
    onBlur,
    "aria-invalid": error ? "true" : undefined,
    "aria-describedby": error ? errId : undefined,
    ...rest,
  };

  return (
    <div className={styles.field}>
      <label htmlFor={id} className={styles.label}>
        {label}
        {required && (
          <span className={styles.required} aria-hidden="true">
            {" "}
            *
          </span>
        )}
      </label>
      {textarea ? (
        <textarea {...controlProps} />
      ) : options ? (
        <select {...controlProps}>
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      ) : (
        <input type={type} {...controlProps} />
      )}
      {error && (
        <p id={errId} className={styles.error} role="alert">
          <AlertCircle aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  );
}
