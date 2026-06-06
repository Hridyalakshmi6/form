import styles from './Field.module.css'

export default function Field({ label, error, children }) {
  return (
    <div className={styles.field}>
      {label && <label className={styles.label}>{label}</label>}
      {children}
      {error && <p className={styles.error}>{error}</p>}
    </div>
  )
}
