import { useEffect, useState } from 'react'
import { db } from '../db/dexie'
import ExtractionCard from '../components/ExtractionCard'

export default function Home(){
  const [items, setItems] = useState([])
  const [q, setQ] = useState('')
  const [metodo, setMetodo] = useState('')

  useEffect(()=>{
    const load = async () => {
      let c = await db.extractions.orderBy('fecha').reverse().toArray()
      if(q) c = c.filter(x => `${x.cafe} ${x.notas}`.toLowerCase().includes(q.toLowerCase()))
      if(metodo) c = c.filter(x => x.metodo === metodo)
      setItems(c)
    }
    load()
  }, [q, metodo])

  return (
    <div className="mx-auto max-w-4xl px-4 py-6">
      <div className="flex items-center justify-between gap-2">
        <input placeholder="Buscar café o notas…" value={q} onChange={e=>setQ(e.target.value)}
          className="flex-1 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 py-2" />
        <select value={metodo} onChange={e=>setMetodo(e.target.value)}
          className="rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 py-2">
          <option value="">Todos</option>
          <option>Moka</option>
          <option>V60</option>
          <option>Kalita</option>
          <option>Goteo</option>
        </select>
      </div>

      <div className="mt-6 grid gap-4">
        {items.length === 0 && <p className="text-neutral-500">No hay registros aún. Crea tu primera extracción desde “Nueva”.</p>}
        {items.map(ex => <ExtractionCard key={ex.id} ex={ex} />)}
      </div>
    </div>
  )
}
