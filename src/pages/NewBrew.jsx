import { useState } from 'react'
import { db } from '../db/dexie'
import Field from '../components/Field'
import MethodSelect from '../components/MethodSelect'
import Rating from '../components/Rating'
import Toggle from '../components/Toggle'
import { toRatio } from '../lib/formats'

export default function NewBrew(){
  const [form, setForm] = useState({
    fecha: new Date().toISOString(),
    metodo: 'Moka',
    molino: 'M1 Race',
    molienda: '',
    gramosCafe: '',
    gramosAgua: '',
    ratio: '',
    temperatura: '',
    tiempoTotal: '',
    cafe: '',
    tueste: '',
    fechaTueste: '',
    puntaje: 7,
    notas: '',
    resultado: 'OK'
  })

  const update = (k, v) => setForm(prev => {
    const next = { ...prev, [k]: v }
    if(k==='gramosCafe' || k==='gramosAgua'){
      next.ratio = toRatio(Number(next.gramosCafe), Number(next.gramosAgua))
    }
    return next
  })

  const save = async (e) => {
    e.preventDefault()
    const id = await db.extractions.add({
      ...form,
      fecha: new Date(form.fecha).toISOString(),
      gramosCafe: Number(form.gramosCafe)||null,
      gramosAgua: Number(form.gramosAgua)||null,
      temperatura: Number(form.temperatura)||null,
      tiempoTotal: Number(form.tiempoTotal)||null,
      molienda: Number(form.molienda)||null,
      puntaje: Number(form.puntaje)||null,
    })
    window.location.href = `/brucat-bitacora-cafe/detail/${id}`
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-6">
      <form className="grid gap-4" onSubmit={save}>
        <Field label="Fecha y hora" required>
          <input type="datetime-local" value={new Date(form.fecha).toISOString().slice(0,16)}
            onChange={e=>update('fecha', new Date(e.target.value).toISOString())}
            className="w-full rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 py-2"/>
        </Field>

        <Field label="Método">
          <MethodSelect value={form.metodo} onChange={v=>update('metodo', v)} />
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Molino">
            <input value={form.molino} onChange={e=>update('molino', e.target.value)}
              className="w-full rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 py-2" />
          </Field>
          <Field label="Molienda (#)" hint="M1 Race: usa tu calibración preferida">
            <input inputMode="numeric" value={form.molienda} onChange={e=>update('molienda', e.target.value)}
              className="w-full rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 py-2" />
          </Field>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <Field label="Gramos café" required>
            <input inputMode="numeric" value={form.gramosCafe} onChange={e=>update('gramosCafe', e.target.value)}
              className="w-full rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 py-2" />
          </Field>
          <Field label="Gramos agua" required>
            <input inputMode="numeric" value={form.gramosAgua} onChange={e=>update('gramosAgua', e.target.value)}
              className="w-full rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 py-2" />
          </Field>
          <Field label="Ratio">
            <input value={form.ratio} onChange={e=>update('ratio', e.target.value)}
              className="w-full rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 py-2" />
          </Field>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <Field label="Temp (°C)">
            <input inputMode="numeric" value={form.temperatura} onChange={e=>update('temperatura', e.target.value)}
              className="w-full rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 py-2" />
          </Field>
          <Field label="Tiempo total (seg)">
            <input inputMode="numeric" value={form.tiempoTotal} onChange={e=>update('tiempoTotal', e.target.value)}
              className="w-full rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 py-2" />
          </Field>
          <Field label="Puntaje (0–10)">
            <Rating value={form.puntaje} onChange={v=>update('puntaje', v)} />
          </Field>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Café / Origen">
            <input value={form.cafe} onChange={e=>update('cafe', e.target.value)}
              className="w-full rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 py-2" />
          </Field>
          <Field label="Tueste">
            <input value={form.tueste} onChange={e=>update('tueste', e.target.value)}
              className="w-full rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 py-2" />
          </Field>
        </div>

        <Field label="Fecha de tueste">
          <input type="date" value={form.fechaTueste?.slice(0,10) || ''}
            onChange={e=>update('fechaTueste', e.target.value ? new Date(e.target.value).toISOString() : '')}
            className="w-full rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 py-2" />
        </Field>

        <Field label="Notas">
          <textarea rows="4" value={form.notas} onChange={e=>update('notas', e.target.value)}
            className="w-full rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 py-2" />
        </Field>

        <Field label="Resultado">
          <Toggle checked={form.resultado==='OK'} onChange={v=>update('resultado', v?'OK':'Ajustar')} />
        </Field>

        <div className="pt-2 flex items-center gap-2">
          <button className="rounded-2xl bg-brucat-primary text-white px-4 py-2 shadow-soft">Guardar</button>
          <a href="/brucat-bitacora-cafe/" className="rounded-2xl px-4 py-2 border">Cancelar</a>
        </div>
      </form>
    </div>
  )
}
