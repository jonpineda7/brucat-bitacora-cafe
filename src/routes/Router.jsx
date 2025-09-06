import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Home from '../pages/Home'
import NewBrew from '../pages/NewBrew'
import Detail from '../pages/Detail'
import Settings from '../pages/Settings'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'new', element: <NewBrew /> },
      { path: 'detail/:id', element: <Detail /> },
      { path: 'settings', element: <Settings /> },
    ]
  }
], {
  basename: '/brucat-bitacora-cafe'
})
