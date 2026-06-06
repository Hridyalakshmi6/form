import styles from './NavRow.module.css'

export default function NavRow({ step, isLast, submitting, onBack, onNext }) {
  return (
    <div className={styles.row}>
      {step > 0 ? (
        <button className={styles.back} onClick={onBack} disabled={submitting}>
          ← Back
        </button>
      ) : <div />}
      <button className={styles.next} onClick={onNext} disabled={submitting}>
        {submitting ? 'Submitting…' : isLast ? 'Submit feedback' : 'Continue →'}
      </button>
    </div>
  )
}
