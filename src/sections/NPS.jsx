import Field from '../components/Field'
import styles from './NPS.module.css'

export default function NPS({ data, update, errors }) {
  return (
    <Field label="How likely are you to recommend us?" error={errors.nps}>
      <div className={styles.npsRow}>
        {Array.from({ length: 11 }, (_, i) => (
          <button
            key={i}
            type="button"
            className={`${styles.btn} ${data.nps === i ? styles.sel : ''}`}
            onClick={() => update({ nps: i })}
            aria-pressed={data.nps === i}
          >
            {i}
          </button>
        ))}
      </div>
      <div className={styles.npsLabels}>
        <span>Not at all likely</span>
        <span>Extremely likely</span>
      </div>
    </Field>
  )
}
