import styles from './StarRating.module.css'

const labels = ['', 'Terrible', 'Poor', 'Okay', 'Good', 'Excellent']

export default function StarRating({ value, onChange, label }) {
  return (
    <div className={styles.wrap}>
      <div className={styles.label}>{label}</div>
      <div className={styles.stars} role="radiogroup" aria-label={label}>
        {[1,2,3,4,5].map(n => (
          <button
            key={n}
            type="button"
            className={`${styles.star} ${n <= value ? styles.lit : ''}`}
            onClick={() => onChange(n)}
            aria-label={`${n} star`}
            aria-pressed={n === value}
          >
            ★
          </button>
        ))}
      </div>
      <div className={styles.hint}>{value ? labels[value] : 'Tap to rate'}</div>
    </div>
  )
}
