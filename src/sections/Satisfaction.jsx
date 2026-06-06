import Field from '../components/Field'
import i from '../components/inputs.module.css'

const OPTIONS = ['Very dissatisfied', 'Dissatisfied', 'Neutral', 'Satisfied', 'Very satisfied']

export default function Satisfaction({ data, update, errors }) {
  return (
    <Field label="Overall satisfaction" error={errors.satisfaction}>
      <div className={i.chipRow}>
        {OPTIONS.map(o => (
          <div
            key={o}
            className={`${i.chip} ${data.satisfaction === o ? i.sel : ''}`}
            onClick={() => update({ satisfaction: o })}
            role="radio"
            aria-checked={data.satisfaction === o}
            tabIndex={0}
            onKeyDown={e => e.key === 'Enter' && update({ satisfaction: o })}
          >
            {o}
          </div>
        ))}
      </div>
    </Field>
  )
}
