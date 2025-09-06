import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { db } from '../db/dexie'

export default function Detail(){
  const { id } = useParams()
  const nav = useNavigate()
  const [ex, setEx] = useState(null)

  useEffect(()=>{
    db.extractions.get(Number(id)).then(setEx)
  }, [id])

  const del = async () => {
    if(confirm('¿Eliminar registro?')){
      await db.extractions.delete(Number(id))
      nav('/')
    }
  }

  if(!ex) return <div className="mx-auto max-w-3xl px-4 py-6">Cargando…</div>
  const d = new Date(ex.fecha)

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 grid gap-4">
      <h1 className="text-2xl font-bold">{ex.metodo} · {ex.cafe || '—'}</h1>
      <p className="text-sm text-neutral-500">{d.toLocaleString()}</p>

      <div className="grid md:grid-cols-2 gap-4">
        <Info label="Molienda">{ex.molienda ?? '—'}</Info>
        <Info label="Molino">{ex.molino || '—'}</Info>
        <Info label="Gramos café">{ex.gramosCafe ?? '—'}</Info>
        <Info label="Gramos agua">{ex.gramosAgua ?? '—'}</Info>
        <Info label="Ratio">{ex.ratio || '—'}</Info>
        <Info label="Temp (°C)">{ex.temperatura ?? '—'}</Info>
        <Info label="Tiempo total (seg)">{ex.tiempoTotal ?? '—'}</Info>
        <Info label="Puntaje">{ex.puntaje ?? '—'}/10</Info>
        <Info label="Resultado">{ex.resultado || '—'}</Info>
        <Info label="Tueste">{ex.tueste || '—'}</Info>
        <Info label="Fecha de tueste">{ex.fechaTueste ? new Date(ex.fechaTueste).toLocaleDateString() : '—'}</Info>
      </div>

      <section>
        <h2 className="font-semibold mb-1">Notas</h2>
        <p className="whitespace-pre-wrap text-sm">{ex.notas || '—'}</p>
      </section>

      <div className="flex gap-2 pt-2">
        <a className="rounded-2xl px-4 py-2 border" href={`/brucat-bitacora-cafe/`}>Volver</a>
        <button onClick={del} className="rounded-2xl px-4 py-2 border border-red-300 text-red-700">Eliminar</button>
      </div>
    </div>
  )
}

function Info({label, children}){
  return (
    <div className="rounded-2xl border p-3 text-sm border-neutral-200 dark:border-neutral-800">
      <p className="text-neutral-500 mb-1">{label}</p>
      <p className="font-medium">{children}</p>
    </div>
  )
}
