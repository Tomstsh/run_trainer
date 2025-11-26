import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { AuthProvider } from './auth/AuthContext'
import PrivateRoutes from './auth/PrivateRoutes'
import DarkMode from './components/DarkMode'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'

function App() {
  return (
    <AuthProvider>
      <DarkMode />
      <Router>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<HomePage/>}/>
            <Route path="*" element={<Navigate to="/"/>}/>
          </Route>
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
export default App
