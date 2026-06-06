import { useState } from 'react'
import ProgressBar from './components/ProgressBar'
import NavRow from './components/NavRow'
import SuccessScreen from './components/SuccessScreen'

import PersonalInfo from './sections/PersonalInfo'
import ProductRating from './sections/ProductRating'
import Satisfaction from './sections/Satisfaction'
import Comments from './sections/Comments'
import IssueReporting from './sections/IssueReporting'
import NPS from './sections/NPS'
import Attachments from './sections/Attachments'
import FollowUpConsent from './sections/FollowUpConsent'

import styles from './App.module.css'

const SECTIONS = [
  { id: 'personal',     title: 'Personal info',              sub: 'Tell us a little about yourself.' },
  { id: 'product',      title: 'Product & service rating',   sub: 'Rate your experience with each area.' },
  { id: 'satisfaction', title: 'Overall satisfaction',       sub: 'How did we do overall?' },
  { id: 'comments',     title: 'Comments & suggestions',     sub: 'Share any thoughts or ideas.' },
  { id: 'issue',        title: 'Issue reporting',            sub: 'Let us know if something went wrong.' },
  { id: 'nps',          title: 'Would you recommend us?',    sub: 'Net Promoter Score — 0 is not at all, 10 is definitely.' },
  { id: 'attachments',  title: 'Attachments',                sub: 'Upload screenshots or supporting files (optional).' },
  { id: 'consent',      title: 'Follow-up consent',          sub: 'Choose how we can follow up with you.' },
]

const defaultData = {
  name: '', email: '', phone: '',
  r_product: 0, r_support: 0, r_delivery: 0, r_value: 0,
  satisfaction: '',
  comments: '', suggestions: '',
  hasIssue: false, issueType: [], issueDesc: '',
  nps: null,
  files: [],
  followUp: true, marketingEmails: false, smsUpdates: false,
}

function validate(sectionId, data) {
  const errs = {}
  if (sectionId === 'personal') {
    if (!data.name.trim()) errs.name = 'Name is required.'
    if (!data.email.trim() || !/\S+@\S+\.\S+/.test(data.email)) errs.email = 'A valid email is required.'
  }
  if (sectionId === 'satisfaction' && !data.satisfaction) errs.satisfaction = 'Please select an option.'
  if (sectionId === 'nps' && data.nps === null) errs.nps = 'Please select a score.'
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

  const handleNext = async () => {
    const errs = validate(section.id, data)
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})

    if (isLast) {
      setSubmitting(true)
      setSubmitError('')
      try {
        const payload = {
          name: data.name, email: data.email, phone: data.phone,
          rating_product: data.r_product, rating_support: data.r_support,
          rating_delivery: data.r_delivery, rating_value: data.r_value,
          satisfaction: data.satisfaction,
          comments: data.comments, suggestions: data.suggestions,
          has_issue: data.hasIssue ? 'Yes' : 'No',
          issue_types: data.issueType.join(', '),
          issue_description: data.issueDesc,
          nps_score: data.nps,
          files_attached: data.files.map(f => f.name).join(', '),
          allow_followup: data.followUp,
          marketing_emails: data.marketingEmails,
          sms_updates: data.smsUpdates,
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

    setStep(s => s + 1)
  }

  const handleBack = () => { setErrors({}); setStep(s => s - 1) }

  if (submitted) return <SuccessScreen name={data.name} />

  const sectionProps = { data, update, errors }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <p className={styles.brand}>Feedback</p>
          <h1 className={styles.sectionTitle}>{section.title}</h1>
          <p className={styles.sectionSub}>{section.sub}</p>
        </div>

        <ProgressBar total={SECTIONS.length} current={step} sections={SECTIONS} />

        <div className={styles.body}>
          {section.id === 'personal'     && <PersonalInfo    {...sectionProps} />}
          {section.id === 'product'      && <ProductRating   {...sectionProps} />}
          {section.id === 'satisfaction' && <Satisfaction    {...sectionProps} />}
          {section.id === 'comments'     && <Comments        {...sectionProps} />}
          {section.id === 'issue'        && <IssueReporting  {...sectionProps} />}
          {section.id === 'nps'          && <NPS             {...sectionProps} />}
          {section.id === 'attachments'  && <Attachments     {...sectionProps} />}
          {section.id === 'consent'      && <FollowUpConsent {...sectionProps} />}

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
