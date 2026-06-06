import styles from './FollowUpConsent.module.css'

const ITEMS = [
  { key: 'followUp',       label: 'Allow follow-up contact',  sub: 'We may reach out to discuss your feedback' },
  { key: 'marketingEmails', label: 'Marketing emails',        sub: 'Offers, updates, and news from us' },
  { key: 'smsUpdates',     label: 'SMS notifications',        sub: 'Order and support updates via SMS' },
]

export default function FollowUpConsent({ data, update }) {
  return (
    <div className={styles.list}>
      {ITEMS.map(item => (
        <label key={item.key} className={styles.row} htmlFor={`consent-${item.key}`}>
          <div>
            <div className={styles.label}>{item.label}</div>
            <div className={styles.sub}>{item.sub}</div>
          </div>
          <div className={styles.toggleWrap}>
            <input
              id={`consent-${item.key}`}
              type="checkbox"
              className={styles.input}
              checked={data[item.key]}
              onChange={e => update({ [item.key]: e.target.checked })}
            />
            <span className={styles.track}>
              <span className={styles.thumb} />
            </span>
          </div>
        </label>
      ))}
    </div>
  )
}
