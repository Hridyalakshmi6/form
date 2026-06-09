import Field from '../components/Field'
import i from '../components/inputs.module.css'

const GENDER_OPTIONS = ['Male', 'Female', 'Others']
const EXP_OPTIONS = [
  'Less than 3 months',
  '3-6 months',
  '6-12 months',
  '1-2 years',
  '2-5 years',
  'More than 5 years'
]
const AIM_OPTIONS = ['Weight loss', 'Weight gain', 'Body building', 'Strength training']
const DAYS_OPTIONS = ['3', '4', '5', '6', '7']
const HOURS_OPTIONS = ['Less than 1', 'Less than 2', 'Less than 3', 'More than 3']
const CONSISTENCY_OPTIONS = ['Yes', 'No', 'Sometimes']

export default function Demographics({ data, update, errors }) {
  const toggleAim = (aim) => {
    const prev = data.gymAim || []
    if (prev.includes(aim)) {
      update({ gymAim: prev.filter(x => x !== aim) })
    } else {
      update({ gymAim: [...prev, aim] })
    }
  }

  return (
    <>
      <div className={i.row2}>
        <Field label="1. What is your age?" error={errors.age}>
          <input
            className={i.input}
            type="number"
            min="10"
            max="120"
            placeholder="Enter your age"
            value={data.age || ''}
            onChange={e => update({ age: e.target.value })}
          />
        </Field>

        <Field label="2. Gender" error={errors.gender}>
          <div className={i.chipRow}>
            {GENDER_OPTIONS.map(opt => (
              <button
                key={opt}
                type="button"
                className={`${i.chip} ${data.gender === opt ? i.sel : ''}`}
                onClick={() => update({ gender: opt })}
              >
                {opt}
              </button>
            ))}
          </div>
        </Field>
      </div>

      <Field label="3. For how many months/years have you been going to the gym?" error={errors.gymExperience}>
        <div className={i.chipRow}>
          {EXP_OPTIONS.map(opt => (
            <button
              key={opt}
              type="button"
              className={`${i.chip} ${data.gymExperience === opt ? i.sel : ''}`}
              onClick={() => update({ gymExperience: opt })}
            >
              {opt}
            </button>
          ))}
        </div>
      </Field>

      <Field label="4. What is your aim of going to the gym? (Select all that apply)" error={errors.gymAim}>
        <div className={i.grid}>
          {AIM_OPTIONS.map(opt => {
            const isSel = (data.gymAim || []).includes(opt)
            return (
              <div
                key={opt}
                className={`${i.cardSelect} ${isSel ? i.sel : ''}`}
                onClick={() => toggleAim(opt)}
              >
                <div className={i.checkbox}>
                  {isSel && <span className={i.checkMark}>✓</span>}
                </div>
                <span className={i.cardSelectText}>{opt}</span>
              </div>
            )
          })}
        </div>
      </Field>

      <div className={i.row2}>
        <Field label="5. For how many days a week do you hit the gym?" error={errors.gymDaysPerWeek}>
          <div className={i.chipRow}>
            {DAYS_OPTIONS.map(opt => (
              <button
                key={opt}
                type="button"
                className={`${i.chip} ${data.gymDaysPerWeek === opt ? i.sel : ''}`}
                onClick={() => update({ gymDaysPerWeek: opt })}
              >
                {opt}
              </button>
            ))}
          </div>
        </Field>

        <Field label="6. How many hours do you work out?" error={errors.gymHoursPerWorkout}>
          <div className={i.chipRow}>
            {HOURS_OPTIONS.map(opt => (
              <button
                key={opt}
                type="button"
                className={`${i.chip} ${data.gymHoursPerWorkout === opt ? i.sel : ''}`}
                onClick={() => update({ gymHoursPerWorkout: opt })}
              >
                {opt}
              </button>
            ))}
          </div>
        </Field>
      </div>

      <Field label="7. Are you consistent with the above mentioned data?" error={errors.gymConsistency}>
        <div className={i.chipRow}>
          {CONSISTENCY_OPTIONS.map(opt => (
            <button
              key={opt}
              type="button"
              className={`${i.chip} ${data.gymConsistency === opt ? i.sel : ''}`}
              onClick={() => update({ gymConsistency: opt })}
            >
              {opt}
            </button>
          ))}
        </div>
      </Field>
    </>
  )
}
