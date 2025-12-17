import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import History from './pages/History'
import Login from './pages/Login'
import Register from './pages/Register'
import NavBar from './components/NavBar'

export default function App(){
  return (
    <BrowserRouter>
      <div className="min-h-screen p-6">
        <NavBar />
        <div className="mt-6 max-w-6xl mx-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/history" element={<History />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}
