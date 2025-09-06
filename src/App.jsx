import { Outlet } from 'react-router-dom'
import NavBar from './components/NavBar'
import './index.css'

export default function App(){
  return (
    <div className="min-h-dvh">
      <NavBar />
      <main>
        <Outlet />
      </main>
      <footer className="mt-10 py-8 text-center text-xs text-neutral-500">© {new Date().getFullYear()} BruCat</footer>
    </div>
  )
}
