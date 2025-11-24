import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { AuthProvider } from './auth/AuthContext'
import PrivateRoutes from './auth/PrivateRoutes'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'

function App() {
  return (
    <AuthProvider>
      <div style={{ position: "relative" }}>
        <div style={{ position: "absolute", top: "-100vh", left: 0, width: "2px", height: "104.5vh", backgroundColor: "black" }}></div>
        <h1 style={{ borderBottom: "2px solid black", paddingLeft: "10px", paddingBottom: "5px" }}>
          Run Trainer</h1>
      </div>
      <h1>Welcome!</h1>
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
