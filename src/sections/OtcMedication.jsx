import i from '../components/inputs.module.css'

const OTC_MEDICATIONS = [
  { id: 1, generic: 'Paracetamol', brand: 'Dolo 650, Paracip, Calpol etc.', use: 'Fever and pain' },
  { id: 2, generic: 'Ibuprofen', brand: 'Brufen, Advil etc', use: 'Painkiller' },
  { id: 3, generic: 'Levocetirizine', brand: 'Levocet, LCZ', use: 'Cold/allergy/running nose/sneezing' },
  { id: 4, generic: 'Chlorpheniramine', brand: 'Piriton, CPM', use: 'Cold/allergy/running nose/sneezing' },
  { id: 5, generic: 'Phenylephrine', brand: 'Decold, Coldact, Flu Cold etc', use: 'Cold/allergy/running nose/sneezing' },
  { id: 6, generic: 'Cough syrup', brand: 'Benadryl, Ascoril, Alex, Tulex-G etc', use: 'Cough' },
  { id: 7, generic: 'PPIs', brand: 'Pantocid, Pan 40, Omesip, Omiz D etc', use: 'Acidity' },
  { id: 8, generic: 'Antiemetics', brand: 'Emeset, Vomikind, Ondanset etc', use: 'Vomiting' },
  { id: 9, generic: 'Antacids', brand: 'Gelusil, Digene, Eno-20, Rantac, Gaviscon etc', use: 'Acidity' },
  { id: 10, generic: 'Diclofenac', brand: 'Voveran, Diclomol etc', use: 'Painkiller' },
  { id: 11, generic: 'Loperamide', brand: 'Imodium, Eldoper, Loperin etc', use: 'Diarrhoea' },
  { id: 12, generic: 'Aspirin', brand: 'Disprin, ecosprin 325, Asa etc', use: 'Painkiller' },
  { id: 13, generic: 'Naproxen', brand: 'Naprosyn, naxdom etc', use: 'Painkiller' },
  { id: 14, generic: 'Mefenamic acid', brand: 'Meftal, meftal spas etc', use: 'Menstrual pain' },
  { id: 15, generic: 'Iron supplements', brand: 'Livogen, fericip XT, haem up etc', use: 'Anemia' }
]

export default function OtcMedication({ data, update }) {
  const otcData = data.otcMedications || {}

  const handleToggle = (generic, choice) => {
    const nextOtc = { ...otcData, [generic]: choice }
    update({ otcMedications: nextOtc })
  }

  return (
    <>
      <p style={{ fontSize: '13px', color: 'var(--c-text-2)', marginBottom: '1.25rem' }}>
        Which of the following OTC medications have you used while consuming gym supplements?
      </p>

      <div className={i.tableWrapper}>
        <table className={i.table}>
          <thead>
            <tr>
              <th style={{ width: '5%' }}>#</th>
              <th style={{ width: '30%' }}>Generic / Brand name</th>
              <th style={{ width: '40%' }}>Indicated Use</th>
              <th style={{ width: '25%', textAlign: 'center' }}>Yes / No</th>
            </tr>
          </thead>
          <tbody>
            {OTC_MEDICATIONS.map(item => {
              const currentVal = otcData[item.generic]
              return (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>
                    <div style={{ fontWeight: '600' }}>{item.generic}</div>
                    <div style={{ fontSize: '11px', color: 'var(--c-text-3)', marginTop: '2px' }}>
                      {item.brand}
                    </div>
                  </td>
                  <td style={{ color: 'var(--c-text-2)' }}>{item.use}</td>
                  <td style={{ textAlign: 'center' }}>
                    <div className={i.toggleGroup}>
                      <button
                        type="button"
                        className={`${i.toggleBtn} ${currentVal === 'Yes' ? i.activeYes : ''}`}
                        onClick={() => handleToggle(item.generic, 'Yes')}
                      >
                        Yes
                      </button>
                      <button
                        type="button"
                        className={`${i.toggleBtn} ${currentVal === 'No' ? i.activeNo : ''}`}
                        onClick={() => handleToggle(item.generic, 'No')}
                      >
                        No
                      </button>
                    </div>
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
