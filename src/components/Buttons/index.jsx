import styles from "./index.module.css";
export function PrimaryButton({label, onClick, stylingCss}) {
    return (
        <button className={`${styles[stylingCss]}`} onClick={onClick}>{label}</button>
    );
}
export function ExtraButton({label, onClick}) {
    return (
        <button className={styles.extraButton} onClick={onClick} >{label}</button>
    );
}