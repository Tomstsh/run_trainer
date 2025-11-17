import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage.jsx'

//import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<div style={{ position: "relative" }}>
          <div style={{ position: "absolute", top: "-100vh", left: 0, width: "2px", height: "104.5vh", backgroundColor: "black" }}></div>
          <h1 style={{ borderBottom: "2px solid black", paddingLeft: "10px", paddingBottom: "5px" }}>
            Run Trainer</h1>
        </div>}/>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}
export default App
