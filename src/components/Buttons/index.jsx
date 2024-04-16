import styles from "./index.module.css";
export function PrimaryButton({label, onClick}) {
    return (
        <button className={`${styles.primaryButton} hover:bg-hover`}  onClick={onClick}>{label}</button>
    );
}
export function SecondaryButton({label, onClick}) {
    return (
        <button className={styles.secondaryButton} onClick={onClick} >{label}</button>
    );
}