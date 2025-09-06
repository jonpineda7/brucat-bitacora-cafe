import { Link } from 'react-router-dom'

export default function ExtractionCard({ ex }) {
  const date = new Date(ex.fecha)
  return (
    <Link to={`/detail/${ex.id}`} className="block p-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-soft hover:shadow-md transition">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold">{ex.metodo} · {ex.cafe || '—'}</h3>
          <p className="text-sm text-neutral-500">{date.toLocaleString()}</p>
        </div>
        <div className="text-right">
          <p className="text-xs">Molienda</p>
          <p className="text-lg font-bold">{ex.molienda ?? '—'}</p>
        </div>
      </div>
      <div className="mt-2 flex items-center justify-between text-sm">
        <span>Puntaje: <b>{ex.puntaje ?? '—'}/10</b></span>
        <span className={`px-2 py-1 rounded-lg ${ex.resultado==='OK'?'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300':'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300'}`}>{ex.resultado || '—'}</span>
      </div>
    </Link>
  )
}
