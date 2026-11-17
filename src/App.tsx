import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useStore } from './store/useStore'
import Landing from './pages/Landing'
import Registro from './pages/Registro'
import AppDashboard from './pages/AppDashboard'
import Hoy from './pages/Hoy'
import Sesion from './pages/Sesion'
import Progreso from './pages/Progreso'
import Metodologia from './pages/Metodologia'
import Premium from './pages/Premium'
import Feedback from './pages/Feedback'
import PanelDemo from './components/PanelDemo'

function AppGuard({ children }: { children: React.ReactNode }) {
  const { perfil, datosEjemplo } = useStore()
  if (!perfil && !datosEjemplo) return <Navigate to="/registro" replace />
  return <>{children}</>
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/app" element={<AppGuard><AppDashboard /></AppGuard>} />
        <Route path="/app/hoy" element={<AppGuard><Hoy /></AppGuard>} />
        <Route path="/app/sesion" element={<AppGuard><Sesion /></AppGuard>} />
        <Route path="/app/progreso" element={<AppGuard><Progreso /></AppGuard>} />
        <Route path="/app/metodologia" element={<AppGuard><Metodologia /></AppGuard>} />
        <Route path="/app/premium" element={<AppGuard><Premium /></AppGuard>} />
        <Route path="/app/feedback" element={<AppGuard><Feedback /></AppGuard>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <PanelDemo />
    </BrowserRouter>
  )
}

export default App
