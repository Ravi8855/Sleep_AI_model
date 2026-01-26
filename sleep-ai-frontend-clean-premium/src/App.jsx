import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import History from './pages/History'
import SleepGuidelines from './pages/SleepGuidelines'
import SleepGoals from './pages/SleepGoals'
import SleepCoach from './pages/SleepCoach'
import Login from './pages/Login'
import Register from './pages/Register'
import MainLayout from './components/MainLayout'

export default function App(){
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes without navbar */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Protected routes with navbar */}
        <Route path="/" element={
          <MainLayout>
            <Home />
          </MainLayout>
        } />
        <Route path="/history" element={
          <MainLayout>
            <History />
          </MainLayout>
        } />
        <Route path="/guidelines" element={
          <MainLayout>
            <SleepGuidelines />
          </MainLayout>
        } />
        <Route path="/goals" element={
          <MainLayout>
            <SleepGoals />
          </MainLayout>
        } />
        <Route path="/coach" element={
          <MainLayout>
            <SleepCoach />
          </MainLayout>
        } />
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
