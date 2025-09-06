export default function Field({ label, children, hint, required }) {
  return (
    <label className="block">
      <span className="block text-sm mb-1">{label}{required && ' *'}</span>
      {children}
      {hint && <p className="text-xs text-neutral-500 mt-1">{hint}</p>}
    </label>
  )
}