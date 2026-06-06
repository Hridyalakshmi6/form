import styles from './ProgressBar.module.css'

export default function ProgressBar({ total, current, sections }) {
  return (
    <div className={styles.wrap} role="progressbar" aria-valuenow={current + 1} aria-valuemax={total}>
      <div className={styles.track}>
        <div
          className={styles.fill}
          style={{ width: `${((current) / (total - 1)) * 100}%` }}
        />
      </div>
      <div className={styles.label}>
        <span>Step {current + 1} of {total}</span>
        <span>{sections[current].title}</span>
      </div>
    </div>
  )
}
