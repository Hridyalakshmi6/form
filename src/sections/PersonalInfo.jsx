import Field from '../components/Field'
import i from '../components/inputs.module.css'

export default function PersonalInfo({ data, update, errors }) {
  return (
    <>
      <Field label="Full name" error={errors.name}>
        <input
          className={i.input}
          type="text"
          placeholder="Your name"
          value={data.name}
          onChange={e => update({ name: e.target.value })}
        />
      </Field>
      <div className={i.row2}>
        <Field label="Email address" error={errors.email}>
          <input
            className={i.input}
            type="email"
            placeholder="you@email.com"
            value={data.email}
            onChange={e => update({ email: e.target.value })}
          />
        </Field>
        <Field label="Phone (optional)">
          <input
            className={i.input}
            type="tel"
            placeholder="+91 98765 43210"
            value={data.phone}
            onChange={e => update({ phone: e.target.value })}
          />
        </Field>
      </div>
    </>
  )
}
