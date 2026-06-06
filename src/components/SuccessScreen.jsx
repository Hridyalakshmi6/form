import styles from './SuccessScreen.module.css'

export default function SuccessScreen({ name }) {
  const firstName = name ? name.split(' ')[0] : 'there'
  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.icon}>✓</div>
        <h1 className={styles.title}>Thank you, {firstName}!</h1>
        <p className={styles.sub}>
          Your feedback has been recorded. We review every submission carefully
          and will reach out if needed.
        </p>
        <button className={styles.btn} onClick={() => window.location.reload()}>
          Submit another response
        </button>
      </div>
    </div>
  )
}
