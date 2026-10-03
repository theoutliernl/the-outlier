import styles from "./Field.module.css";
import { cn } from "./cn";

/** Labelled form field. multiline renders a textarea. All props pass to the input. */
export default function Field({ label, name, multiline = false, hint, className, ...rest }) {
  const id = `f-${name}`;
  const Control = multiline ? "textarea" : "input";
  return (
    <div className={cn(styles.field, className)}>
      <label htmlFor={id} className={styles.label}>{label}{rest.required ? "" : <span className={styles.opt}> (optional)</span>}</label>
      <Control id={id} name={name} className={cn(styles.control, multiline && styles.area)} {...rest} />
      {hint && <span className={styles.hint}>{hint}</span>}
    </div>
  );
}
