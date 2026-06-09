import Field from '../components/Field'
import i from '../components/inputs.module.css'

const READ_LABELS_OPTIONS = ['Yes', 'No', 'Sometimes']
const RECOMMEND_OPTIONS = ['Self', 'Gym trainer', 'Family/friends', 'Online influencers']

export default function Awareness({ data, update, errors }) {
  // Get medicines marked 'Yes' in Section C
  const otcMedications = data.otcMedications || {}
  const yesOtcMedicines = Object.keys(otcMedications).filter(k => otcMedications[k] === 'Yes')

  // Get supplements selected in Section B
  const selectedSupps = data.selectedSupplements || []

  const toggleConcurrentMedicine = (med) => {
    const prev = data.concurrentMedicines || []
    if (prev.includes(med)) {
      update({ concurrentMedicines: prev.filter(x => x !== med) })
    } else {
      update({ concurrentMedicines: [...prev, med] })
    }
  }

  const toggleCombinedSupplement = (supp) => {
    const prev = data.combinedSupplements || []
    if (prev.includes(supp)) {
      update({ combinedSupplements: prev.filter(x => x !== supp) })
    } else {
      update({ combinedSupplements: [...prev, supp] })
    }
  }

  const toggleRecommendSource = (src) => {
    const prev = data.recommendedBy || []
    if (prev.includes(src)) {
      update({ recommendedBy: prev.filter(x => x !== src) })
    } else {
      update({ recommendedBy: [...prev, src] })
    }
  }

  return (
    <>
      <Field label="1. Do you read the labels of the medication you use?" error={errors.readLabels}>
        <div className={i.chipRow}>
          {READ_LABELS_OPTIONS.map(opt => (
            <button
              key={opt}
              type="button"
              className={`${i.chip} ${data.readLabels === opt ? i.sel : ''}`}
              onClick={() => update({ readLabels: opt })}
            >
              {opt}
            </button>
          ))}
        </div>
      </Field>

      {/* Dynamic Question 2: Which OTC meds used along with supplements */}
      <Field
        label="2. Which of the OTC medicines do you use along with supplements? (Select all that apply)"
        error={errors.concurrentMedicines}
      >
        {yesOtcMedicines.length > 0 ? (
          <div className={i.chipRow}>
            {yesOtcMedicines.map(med => {
              const isSel = (data.concurrentMedicines || []).includes(med)
              return (
                <button
                  key={med}
                  type="button"
                  className={`${i.chip} ${isSel ? i.sel : ''}`}
                  onClick={() => toggleConcurrentMedicine(med)}
                >
                  {med}
                </button>
              )
            })}
          </div>
        ) : (
          <div className={i.infoBox}>
            No OTC medications were marked as 'Yes' in Section C. If you take other medications, you can write them below or continue:
            <input
              type="text"
              style={{ marginTop: '8px' }}
              className={i.input}
              placeholder="Other medicines used concurrently"
              value={data.otherConcurrentMedicines || ''}
              onChange={e => update({ otherConcurrentMedicines: e.target.value })}
            />
          </div>
        )}
      </Field>

      {/* Dynamic Question 3: Which supplements are combined */}
      <Field
        label="3. Which supplements do you take in combination for added effect? (Select all that apply)"
        error={errors.combinedSupplements}
      >
        {selectedSupps.length > 0 ? (
          <div className={i.chipRow}>
            {selectedSupps.map(supp => {
              const isSel = (data.combinedSupplements || []).includes(supp)
              return (
                <button
                  key={supp}
                  type="button"
                  className={`${i.chip} ${isSel ? i.sel : ''}`}
                  onClick={() => toggleCombinedSupplement(supp)}
                >
                  {supp}
                </button>
              )
            })}
          </div>
        ) : (
          <div className={i.infoBox}>
            No supplements were selected in Section B.
          </div>
        )}
      </Field>

      <div className={i.row2}>
        <Field label="4. Do you know daily caffeine limits?" error={errors.knowCaffeineLimit}>
          <div className={i.chipRow}>
            {['Yes', 'No'].map(opt => (
              <button
                key={opt}
                type="button"
                className={`${i.chip} ${data.knowCaffeineLimit === opt ? i.sel : ''}`}
                onClick={() => update({ knowCaffeineLimit: opt })}
              >
                {opt}
              </button>
            ))}
          </div>
        </Field>

        <Field label="5. Are you aware supplements can interact with OTC Medications?" error={errors.awareOfInteractions}>
          <div className={i.chipRow}>
            {['Yes', 'No'].map(opt => (
              <button
                key={opt}
                type="button"
                className={`${i.chip} ${data.awareOfInteractions === opt ? i.sel : ''}`}
                onClick={() => update({ awareOfInteractions: opt })}
              >
                {opt}
              </button>
            ))}
          </div>
        </Field>
      </div>

      <Field label="6. Who recommended the supplements? (Select all that apply)" error={errors.recommendedBy}>
        <div className={i.grid}>
          {RECOMMEND_OPTIONS.map(opt => {
            const isSel = (data.recommendedBy || []).includes(opt)
            return (
              <div
                key={opt}
                className={`${i.cardSelect} ${isSel ? i.sel : ''}`}
                onClick={() => toggleRecommendSource(opt)}
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
