import { useEffect, useMemo, useState } from 'react'
import { db } from '../db/dexie'
import {
  ResponsiveContainer,
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  BarChart, Bar,
  ScatterChart, Scatter
} from 'recharts'

export default function Stats(){
  const [rows, setRows] = useState([])

  useEffect(()=>{
    db.extractions.orderBy('fecha').toArray().then(setRows)
  }, [])

  const lineData = useMemo(()=> rows
    .filter(r=>typeof r.puntaje === 'number')
    .sort((a,b)=> new Date(a.fecha) - new Date(b.fecha))
    .map(r=>({
      fecha: new Date(r.fecha).toLocaleDateString(),
      puntaje: r.puntaje
    })), [rows])

  const avgByMethod = useMemo(()=>{
    const acc = {}
    for(const r of rows){
      if(typeof r.puntaje !== 'number') continue
      const k = r.metodo || '—'
      acc[k] = acc[k] || { metodo: k, total:0, n:0 }
      acc[k].total += r.puntaje; acc[k].n += 1
    }
    return Object.values(acc).map(x=>({ metodo: x.metodo, promedio: +(x.total/x.n).toFixed(1) }))
  }, [rows])

  const scatter = useMemo(()=> rows
    .filter(r=> typeof r.puntaje === 'number' && typeof r.molienda === 'number')
    .map(r=>({ molienda: r.molienda, puntaje: r.puntaje })), [rows])

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 grid gap-8">
      <section>
        <h2 className="text-xl font-bold mb-2">Evolución de puntaje</h2>
        <div className="h-64 rounded-2xl border border-neutral-200 dark:border-neutral-800 p-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={lineData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="fecha" interval={'preserveStartEnd'} />
              <YAxis domain={[0,10]} />
              <Tooltip />
              <Line type="monotone" dataKey="puntaje" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-2">Promedio por método</h2>
        <div className="h-64 rounded-2xl border border-neutral-200 dark:border-neutral-800 p-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={avgByMethod} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="metodo" />
              <YAxis domain={[0,10]} />
              <Tooltip />
              <Bar dataKey="promedio" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-2">Molienda vs Puntaje</h2>
        <p className="text-sm text-neutral-500 mb-2">Visualiza cómo tus ajustes del M1 Race correlacionan con la calidad percibida.</p>
        <div className="h-64 rounded-2xl border border-neutral-200 dark:border-neutral-800 p-2">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="molienda" name="Molienda (#)" />
              <YAxis dataKey="puntaje" name="Puntaje" domain={[0,10]} />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Scatter data={scatter} />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  )
}
