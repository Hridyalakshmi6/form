import Field from '../components/Field'
import i from '../components/inputs.module.css'

const SUPPLEMENT_LIST = [
  'Whey protein',
  'Creatine supplements',
  'Pre work out supplements - caffeine, taurine, theanine',
  'Mass gainers - whey, casein, creatine',
  'BCAA/EAA supplements',
  'Fat burners / Thermogenics - Caffeine, green tea extract, L-carnitine, capsaicin',
  'Testosterone boosters - Ashwagandha, zinc, d-aspartic acid',
  'Nitric oxide / pump boosters - L-arginine',
  'Energy drinks - caffeine, taurine, L-carnitine, sugars',
  'Electrolyte supplements - Na, K, Mg, Ca, Glucose',
  'Sleep / Recovery supplements - Melatonin, magnesium, GABA',
  'Joint support supplements - Glucosamin, Chondroitin, Collagen',
  'SARMs (Selective Androgen Receptor Modulator)',
  'Anabolic steroids',
  'Cutting drugs - Clenbuterol, thyroid hormone analogues, furosemide, spironolactone',
  'Injectable performance enhancing drugs - somatropin, insulin, testosterone, nandrolone',
  'Vitamin D3',
  'Calcium',
  'Vitamin C',
  'Vitamin B Complex'
]

export default function SupplementUse({ data, update, errors }) {
  const handleUseChange = (val) => {
    // If selecting "No", clear out selected supplements
    if (val === 'No') {
      update({ takesSupplements: val, selectedSupplements: [] })
    } else {
      update({ takesSupplements: val })
    }
  }

  const toggleSupplement = (supp) => {
    const prev = data.selectedSupplements || []
    if (prev.includes(supp)) {
      update({ selectedSupplements: prev.filter(x => x !== supp) })
    } else {
      update({ selectedSupplements: [...prev, supp] })
    }
  }

  const showList = data.takesSupplements === 'Yes' || data.takesSupplements === 'Occasionally'

  return (
    <>
      <Field label="1. Do you take supplements?" error={errors.takesSupplements}>
        <div className={i.chipRow}>
          {['Yes', 'No', 'Occasionally'].map(opt => (
            <button
              key={opt}
              type="button"
              className={`${i.chip} ${data.takesSupplements === opt ? i.sel : ''}`}
              onClick={() => handleUseChange(opt)}
            >
              {opt}
            </button>
          ))}
        </div>
      </Field>

      {showList && (
        <div style={{ marginTop: '1.5rem', animation: 'fadeIn 0.3s ease-in-out' }}>
          <Field label="2. If yes, choose which supplements you consume:" error={errors.selectedSupplements}>
            <div className={i.grid}>
              {SUPPLEMENT_LIST.map(opt => {
                const isSel = (data.selectedSupplements || []).includes(opt)
                return (
                  <div
                    key={opt}
                    className={`${i.cardSelect} ${isSel ? i.sel : ''}`}
                    onClick={() => toggleSupplement(opt)}
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
        </div>
      )}
    </>
  )
}
