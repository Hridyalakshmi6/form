import StarRating from '../components/StarRating'

const RATINGS = [
  { key: 'r_product',  label: 'Product quality' },
  { key: 'r_support',  label: 'Customer support' },
  { key: 'r_delivery', label: 'Delivery / speed' },
  { key: 'r_value',    label: 'Value for money' },
]

export default function ProductRating({ data, update }) {
  return (
    <>
      {RATINGS.map(r => (
        <StarRating
          key={r.key}
          label={r.label}
          value={data[r.key]}
          onChange={v => update({ [r.key]: v })}
        />
      ))}
    </>
  )
}
