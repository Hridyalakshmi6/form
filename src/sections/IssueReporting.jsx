import Field from '../components/Field'
import i from '../components/inputs.module.css'

const ISSUE_TYPES = ['Wrong item', 'Damaged product', 'Late delivery', 'Poor support', 'Billing issue', 'Other']

export default function IssueReporting({ data, update }) {
  const toggleType = (t) => {
    const types = data.issueType.includes(t)
      ? data.issueType.filter(x => x !== t)
      : [...data.issueType, t]
    update({ issueType: types })
  }

  return (
    <>
      <Field label="Did you experience any issues?">
        <div className={i.chipRow}>
          {['Yes', 'No'].map(o => (
            <div
              key={o}
              className={`${i.chip} ${(o === 'Yes' && data.hasIssue) || (o === 'No' && !data.hasIssue) ? i.sel : ''}`}
              onClick={() => update({ hasIssue: o === 'Yes' })}
              role="radio"
              tabIndex={0}
              onKeyDown={e => e.key === 'Enter' && update({ hasIssue: o === 'Yes' })}
            >
              {o}
            </div>
          ))}
        </div>
      </Field>

      {data.hasIssue && (
        <>
          <Field label="Issue type (select all that apply)">
            <div className={i.chipRow}>
              {ISSUE_TYPES.map(t => (
                <div
                  key={t}
                  className={`${i.chip} ${data.issueType.includes(t) ? i.sel : ''}`}
                  onClick={() => toggleType(t)}
                  role="checkbox"
                  aria-checked={data.issueType.includes(t)}
                  tabIndex={0}
                  onKeyDown={e => e.key === 'Enter' && toggleType(t)}
                >
                  {t}
                </div>
              ))}
            </div>
          </Field>
          <Field label="Describe the issue">
            <textarea
              className={i.textarea}
              placeholder="Tell us what happened…"
              value={data.issueDesc}
              onChange={e => update({ issueDesc: e.target.value })}
            />
          </Field>
        </>
      )}
    </>
  )
}
