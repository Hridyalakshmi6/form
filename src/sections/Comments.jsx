import Field from '../components/Field'
import i from '../components/inputs.module.css'

export default function Comments({ data, update }) {
  return (
    <>
      <Field label="Comments">
        <textarea
          className={i.textarea}
          placeholder="What did you like or dislike?"
          value={data.comments}
          onChange={e => update({ comments: e.target.value })}
        />
      </Field>
      <Field label="Suggestions for improvement">
        <textarea
          className={i.textarea}
          placeholder="Any ideas to help us improve?"
          value={data.suggestions}
          onChange={e => update({ suggestions: e.target.value })}
        />
      </Field>
    </>
  )
}
