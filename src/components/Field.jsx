const METHODS = ['Moka','V60','Kalita','Goteo']

export default function MethodSelect({ value, onChange }){
  return (
    <select className="w-full rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 py-2"
      value={value} onChange={e=>onChange(e.target.value)}>
      {METHODS.map(m => <option key={m} value={m}>{m}</option>)}
    </select>
  )
}
