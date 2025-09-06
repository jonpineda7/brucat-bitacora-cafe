export default function Toggle({ checked, onChange, labels=['Ajustar','OK'] }) {
  return (
    <button type="button" onClick={()=>onChange(!checked)}
      className={`rounded-xl px-3 py-2 border text-sm ${checked? 'bg-green-600 text-white border-green-700':'bg-neutral-100 dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700'}`}>
      {checked ? labels[1] : labels[0]}
    </button>
  )
}
