export default function Rating({ value, onChange }) {
  return (
    <input type="range" min={0} max={10} step={1} value={value}
      onChange={e=>onChange(Number(e.target.value))}
      className="w-full" />
  )
}
