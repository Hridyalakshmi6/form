import { useState } from 'react'
import ProgressBar from './components/ProgressBar'
import NavRow from './components/NavRow'
import SuccessScreen from './components/SuccessScreen'

import Demographics from './sections/Demographics'
import SupplementUse from './sections/SupplementUse'
import SupplementDetails from './sections/SupplementDetails'
import OtcMedication from './sections/OtcMedication'
import Awareness from './sections/Awareness'
import SideEffects from './sections/SideEffects'

import styles from './App.module.css'

const SECTIONS = [
  { id: 'demographics',      title: 'Demographics',              sub: 'Section A - Basic participant details.' },
  { id: 'supplementUse',      title: 'Supplement Use',            sub: 'Section B - Gym supplement choices.' },
  { id: 'supplementDetails',  title: 'Supplement Intake Details', sub: 'Section B - Frequency and duration of supplements.' },
  { id: 'otcMedication',      title: 'OTC Medication Use',        sub: 'Section C - Common over-the-counter medications used.' },
  { id: 'awareness',          title: 'Awareness & Assessment',    sub: 'Section D - Usage combinations and interaction awareness.' },
  { id: 'sideEffects',        title: 'Side Effects & Habits',     sub: 'Section E - Side effects and lifestyle habits.' },
]

const defaultData = {
  age: '',
  gender: '',
  gymExperience: '',
  gymAim: [],
  gymDaysPerWeek: '',
  gymHoursPerWorkout: '',
  gymConsistency: '',
  takesSupplements: '',
  selectedSupplements: [],
  supplementDetails: {}, // { [suppName]: { timesPerDay: '', daysPerWeek: '', duration: '' } }
  otcMedications: {}, // { [medName]: 'Yes' | 'No' }
  readLabels: '',
  concurrentMedicines: [],
  otherConcurrentMedicines: '',
  combinedSupplements: [],
  knowCaffeineLimit: '',
  awareOfInteractions: '',
  recommendedBy: [],
  sideEffects: [],
  otherSideEffects: '',
  lifestyleHabits: [],
}

function validate(sectionId, data) {
  const errs = {}
  if (sectionId === 'demographics') {
    if (!data.age || isNaN(data.age) || parseInt(data.age) <= 0) errs.age = 'A valid age is required.'
    if (!data.gender) errs.gender = 'Gender selection is required.'
    if (!data.gymExperience) errs.gymExperience = 'Gym experience duration is required.'
    if (!data.gymAim || data.gymAim.length === 0) errs.gymAim = 'Please select at least one goal.'
    if (!data.gymDaysPerWeek) errs.gymDaysPerWeek = 'Workout frequency is required.'
    if (!data.gymHoursPerWorkout) errs.gymHoursPerWorkout = 'Workout hours are required.'
    if (!data.gymConsistency) errs.gymConsistency = 'Consistency selection is required.'
  }
  if (sectionId === 'supplementUse') {
    if (!data.takesSupplements) {
      errs.takesSupplements = 'Please select an option.'
    } else if ((data.takesSupplements === 'Yes' || data.takesSupplements === 'Occasionally') && (!data.selectedSupplements || data.selectedSupplements.length === 0)) {
      errs.selectedSupplements = 'Please select at least one supplement.'
    }
  }
  if (sectionId === 'awareness') {
    if (!data.readLabels) errs.readLabels = 'Label reading selection is required.'
    if (!data.knowCaffeineLimit) errs.knowCaffeineLimit = 'Please answer this question.'
    if (!data.awareOfInteractions) errs.awareOfInteractions = 'Please answer this question.'
  }
  return errs
}

export default function App() {
  const [step, setStep] = useState(0)
  const [data, setData] = useState(defaultData)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const section = SECTIONS[step]
  const isLast = step === SECTIONS.length - 1

  const update = (patch) => setData(prev => ({ ...prev, ...patch }))

  // Skip SupplementDetails step if they do not take supplements
  const shouldSkipDetails = (takes, selected) => {
    return takes === 'No' || !selected || selected.length === 0
  }

  const handleNext = async () => {
    const errs = validate(section.id, data)
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})

    if (isLast) {
      setSubmitting(true)
      setSubmitError('')
      try {
        const payload = {
          age: data.age,
          gender: data.gender,
          gym_experience: data.gymExperience,
          gym_aim: (data.gymAim || []).join(', '),
          gym_days_per_week: data.gymDaysPerWeek,
          gym_hours_per_workout: data.gymHoursPerWorkout,
          gym_consistency: data.gymConsistency,
          takes_supplements: data.takesSupplements,
          selected_supplements: (data.selectedSupplements || []).join(', '),
          supplement_details: (data.selectedSupplements || []).map(supp => {
            const d = (data.supplementDetails || {})[supp] || {}
            return `${supp} (${d.timesPerDay || '?'} times/day, ${d.daysPerWeek || '?'} days/week, ${d.duration || '?'})`
          }).join(' | '),
          otc_medications_used: Object.keys(data.otcMedications || {}).filter(k => (data.otcMedications || {})[k] === 'Yes').join(', '),
          otc_details: Object.keys(data.otcMedications || {}).map(k => `${k}: ${(data.otcMedications || {})[k]}`).join(', '),
          read_labels: data.readLabels,
          concurrent_medicines: [
            ...(data.concurrentMedicines || []),
            ...(data.otherConcurrentMedicines ? [data.otherConcurrentMedicines] : [])
          ].join(', '),
          combined_supplements: (data.combinedSupplements || []).join(', '),
          know_caffeine_limit: data.knowCaffeineLimit,
          aware_of_interactions: data.awareOfInteractions,
          recommended_by: (data.recommendedBy || []).join(', '),
          side_effects: [
            ...(data.sideEffects || []).filter(x => x !== 'Others'),
            ...(data.otherSideEffects ? [`Others (${data.otherSideEffects})`] : [])
          ].join(', '),
          lifestyle_habits: (data.lifestyleHabits || []).join(', ')
        }

        const res = await fetch('/api/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        if (!res.ok) throw new Error('Server error')
        setSubmitted(true)
      } catch {
        setSubmitError('Something went wrong. Please try again.')
      } finally {
        setSubmitting(false)
      }
      return
    }

    // Dynamic Step Skipping
    if (section.id === 'supplementUse') {
      if (shouldSkipDetails(data.takesSupplements, data.selectedSupplements)) {
        setStep(step + 2) // Skip SupplementDetails (2) -> go to OtcMedication (3)
        return
      }
    }

    setStep(s => s + 1)
  }

  const handleBack = () => {
    setErrors({})
    
    // Dynamic Step Skipping backwards
    if (section.id === 'otcMedication') {
      if (shouldSkipDetails(data.takesSupplements, data.selectedSupplements)) {
        setStep(step - 2) // Go back to SupplementUse (1)
        return
      }
    }

    setStep(s => s - 1)
  }

  if (submitted) return <SuccessScreen name="Fitness Participant" />

  const sectionProps = { data, update, errors }

  return (
    <div className={styles.page}>
      <div className={styles.card} style={{ maxWidth: '720px' /* expanded for side-by-side matrices */ }}>
        <div className={styles.cardHeader}>
          <p className={styles.brand}>Pharmacotherapeutics-I Minor Project</p>
          <h1 className={styles.sectionTitle}>{section.title}</h1>
          <p className={styles.sectionSub}>{section.sub}</p>
        </div>

        <ProgressBar total={SECTIONS.length} current={step} sections={SECTIONS} />

        <div className={styles.body}>
          {section.id === 'demographics'      && <Demographics      {...sectionProps} />}
          {section.id === 'supplementUse'      && <SupplementUse      {...sectionProps} />}
          {section.id === 'supplementDetails'  && <SupplementDetails  {...sectionProps} />}
          {section.id === 'otcMedication'      && <OtcMedication      {...sectionProps} />}
          {section.id === 'awareness'          && <Awareness          {...sectionProps} />}
          {section.id === 'sideEffects'        && <SideEffects        {...sectionProps} />}

          {submitError && <p className={styles.submitError}>{submitError}</p>}
        </div>

        <NavRow
          step={step}
          isLast={isLast}
          submitting={submitting}
          onBack={handleBack}
          onNext={handleNext}
        />
      </div>
    </div>
  )
}
