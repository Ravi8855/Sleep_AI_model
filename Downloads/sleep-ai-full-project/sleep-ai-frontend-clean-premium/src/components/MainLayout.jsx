import React from 'react'
import NavBar from './NavBar'

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <div className="flex-grow p-6">
        <div className="mt-6 max-w-6xl mx-auto">
          {children}
        </div>
      </div>
    </div>
  )
}