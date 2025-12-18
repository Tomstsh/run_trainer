import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { AuthProvider } from './auth/AuthContext'
import PrivateRoutes from './auth/PrivateRoutes'
import DarkMode from './components/DarkMode'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import { PlanPage } from './pages/PlanPage'

function App() {
  return (
    <AuthProvider>
      <DarkMode />
      <Router>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/plans/:plan_id" element={<PlanPage/>}/>
            <Route path="*" element={<Navigate to="/"/>}/>
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
export default App
