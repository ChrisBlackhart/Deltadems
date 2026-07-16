import styles from "./forms.module.css";

// Accessible labelled field. Renders a textarea when `textarea` is set,
// otherwise an input. Options render a <select>.
export function Field({
  id,
  label,
  type = "text",
  required = false,
  textarea = false,
  options,
  ...rest
}) {
  const controlProps = {
    id,
    name: id,
    required,
    className: styles.control,
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
    </div>
  );
}
