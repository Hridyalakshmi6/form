import Field from '../components/Field'
import i from '../components/inputs.module.css'

const SIDE_EFFECTS = [
  'Palpitations', 'Insomnia', 'Anxiety', 'Acidity', 'Dizziness', 'Cramps', 'Headache',
  'Nausea', 'Vomiting', 'Bloating', 'Abdominal pain', 'Constipation', 'Diarrhoea',
  'Loss of appetite', 'Mood swings', 'Dependency', 'Tremors', 'Rapid heart beat',
  'Excessive sweating', 'Shortness of breath'
]

const HABIT_OPTIONS = ['Alcohol intake', 'Smoking', 'Drug use']

export default function SideEffects({ data, update, errors }) {
  const toggleSideEffect = (effect) => {
    const prev = data.sideEffects || []
    if (prev.includes(effect)) {
      update({ sideEffects: prev.filter(x => x !== effect) })
    } else {
      update({ sideEffects: [...prev, effect] })
    }
  }

  const toggleHabit = (habit) => {
    const prev = data.lifestyleHabits || []
    if (prev.includes(habit)) {
      update({ lifestyleHabits: prev.filter(x => x !== habit) })
    } else {
      update({ lifestyleHabits: [...prev, habit] })
    }
  }

  const hasOthers = (data.sideEffects || []).includes('Others')

  return (
    <>
      <Field
        label="1. Have you experienced any of these side effects when you are taking medications along with gym supplements? (Select all that apply)"
        error={errors.sideEffects}
      >
        <div className={i.grid}>
          {SIDE_EFFECTS.map(opt => {
            const isSel = (data.sideEffects || []).includes(opt)
            return (
              <div
                key={opt}
                className={`${i.cardSelect} ${isSel ? i.sel : ''}`}
                onClick={() => toggleSideEffect(opt)}
              >
                <div className={i.checkbox}>
                  {isSel && <span className={i.checkMark}>✓</span>}
                </div>
                <span className={i.cardSelectText}>{opt}</span>
              </div>
            )
          })}
          
          {/* Others option */}
          <div
            className={`${i.cardSelect} ${(data.sideEffects || []).includes('Others') ? i.sel : ''}`}
            onClick={() => toggleSideEffect('Others')}
          >
            <div className={i.checkbox}>
              {(data.sideEffects || []).includes('Others') && <span className={i.checkMark}>✓</span>}
            </div>
            <span className={i.cardSelectText}>Others</span>
          </div>
        </div>
      </Field>

      {hasOthers && (
        <div style={{ marginTop: '-0.5rem', marginBottom: '1.25rem', animation: 'fadeIn 0.2s ease-in-out' }}>
          <Field label="Please describe other side effects:" error={errors.otherSideEffects}>
            <input
              type="text"
              className={i.input}
              placeholder="Describe symptoms here"
              value={data.otherSideEffects || ''}
              onChange={e => update({ otherSideEffects: e.target.value })}
            />
          </Field>
        </div>
      )}

      <Field label="2. Do you engage in any of the following lifestyle habits? (Select all that apply)" error={errors.lifestyleHabits}>
        <div className={i.grid}>
          {HABIT_OPTIONS.map(opt => {
            const isSel = (data.lifestyleHabits || []).includes(opt)
            return (
              <div
                key={opt}
                className={`${i.cardSelect} ${isSel ? i.sel : ''}`}
                onClick={() => toggleHabit(opt)}
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
    </>
  )
}
