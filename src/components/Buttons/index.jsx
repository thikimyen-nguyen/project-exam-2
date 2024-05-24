import styles from "./index.module.css";
/**
 * Represents a primary button component.
 *
 * @param {Object} props - The component props.
 * @param {string} props.label - The label text for the button.
 * @param {Function} props.onClick - The click event handler for the button.
 * @param {string} props.stylingCss - The CSS class name for styling the button.
 * @returns {JSX.Element} - A button element with the specified label and styling.
 */
export function PrimaryButton({ label, onClick, stylingCss }) {
  return (
    <button className={`${styles[stylingCss]}`} onClick={onClick}>
      {label}
    </button>
  );
}
/**
 * Represents an extra button component.
 *
 * @param {Object} props - The component props.
 * @param {string} props.label - The label text for the button.
 * @param {Function} props.onClick - The click event handler for the button.
 * @returns {JSX.Element} - A button element with the specified label.
 */
export function ExtraButton({ label, onClick }) {
  return (
    <button className={styles.extraButton} onClick={onClick}>
      {label}
    </button>
  );
}
