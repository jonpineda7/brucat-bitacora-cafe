import { Link, NavLink } from 'react-router-dom'

export default function NavBar() {
  const active = 'text-brucat-accent font-semibold'
  return (
    <header className="sticky top-0 z-10 bg-white/80 dark:bg-neutral-900/80 backdrop-blur border-b border-neutral-200 dark:border-neutral-800">
      <nav className="mx-auto max-w-4xl px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src="/brucat-bitacora-cafe/favicon.svg" alt="BruCat" className="w-6 h-6" />
          <span className="font-bold">Brucat Bitácora</span>
        </Link>
        <div className="flex items-center gap-4 text-sm">
          <NavLink to="/" className={({isActive}) => isActive ? active : ''}>Inicio</NavLink>
          <NavLink to="/new" className={({isActive}) => isActive ? active : ''}>Nueva</NavLink>
          <NavLink to="/settings" className={({isActive}) => isActive ? active : ''}>Ajustes</NavLink>
        </div>
      </nav>
    </header>
  )
}
