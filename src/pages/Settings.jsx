import { useEffect, useState } from 'react'

export default function Settings(){
  const [dark, setDark] = useState(false)

  useEffect(()=>{
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  return (
    <div className="mx-auto max-w-2xl px-4 py-6 grid gap-4">
      <h1 className="text-2xl font-bold">Ajustes</h1>
      <label className="flex items-center gap-2">
        <input type="checkbox" checked={dark} onChange={e=>setDark(e.target.checked)} />
        <span>Modo oscuro</span>
      </label>
      <p className="text-sm text-neutral-500">(Próximamente: catálogos, exportar/importar JSON, presets por método…)</p>
    </div>
  )
}
