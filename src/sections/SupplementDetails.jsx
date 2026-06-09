import Field from '../components/Field'
import i from '../components/inputs.module.css'

export default function SupplementDetails({ data, update, errors }) {
  const selected = data.selectedSupplements || []
  const details = data.supplementDetails || {}

  const handleDetailChange = (supp, field, val) => {
    const prevSupp = details[supp] || { timesPerDay: '', daysPerWeek: '', duration: '' }
    const nextDetails = {
      ...details,
      [supp]: {
        ...prevSupp,
        [field]: val
      }
    }
    update({ supplementDetails: nextDetails })
  }

  if (selected.length === 0) {
    return (
      <div className={i.infoBox}>
        You have not selected any supplements in the previous step. You can proceed to the next section.
      </div>
    )
  }

  return (
    <>
      <p style={{ fontSize: '13px', color: 'var(--c-text-2)', marginBottom: '1rem' }}>
        Please enter the consumption frequency details for each of your selected supplements.
      </p>

      {/* Desktop/Tablet Table Layout */}
      <div className={i.tableWrapper}>
        <table className={i.table}>
          <thead>
            <tr>
              <th style={{ width: '40%' }}>Supplement</th>
              <th style={{ width: '20%' }}>Times/day</th>
              <th style={{ width: '20%' }}>Days/week</th>
              <th style={{ width: '20%' }}>Duration of use</th>
            </tr>
          </thead>
          <tbody>
            {selected.map(supp => {
              const val = details[supp] || { timesPerDay: '', daysPerWeek: '', duration: '' }
              const err = errors[`supp_${supp}`] || {}
              return (
                <tr key={supp}>
                  <td style={{ fontWeight: '500' }}>{supp}</td>
                  <td>
                    <input
                      type="text"
                      className={i.tableInput}
                      placeholder="e.g. 2"
                      value={val.timesPerDay}
                      onChange={e => handleDetailChange(supp, 'timesPerDay', e.target.value)}
                    />
                    {err.timesPerDay && <span style={{ color: 'var(--c-danger)', fontSize: '11px' }}>{err.timesPerDay}</span>}
                  </td>
                  <td>
                    <input
                      type="text"
                      className={i.tableInput}
                      placeholder="e.g. 7"
                      value={val.daysPerWeek}
                      onChange={e => handleDetailChange(supp, 'daysPerWeek', e.target.value)}
                    />
                    {err.daysPerWeek && <span style={{ color: 'var(--c-danger)', fontSize: '11px' }}>{err.daysPerWeek}</span>}
                  </td>
                  <td>
                    <input
                      type="text"
                      className={i.tableInput}
                      placeholder="e.g. 6 months"
                      value={val.duration}
                      onChange={e => handleDetailChange(supp, 'duration', e.target.value)}
                    />
                    {err.duration && <span style={{ color: 'var(--c-danger)', fontSize: '11px' }}>{err.duration}</span>}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}
