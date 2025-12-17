import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import useUserStore from '../store/userStore'

export default function NavBar(){
  const token = useUserStore((s)=>s.token)
  const location = useLocation()
  
  const isActive = (path) => location.pathname === path
  
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-teal-500 to-blue-500 flex items-center justify-center shadow">
              <span className="text-white text-xl">💤</span>
            </div>
            <div>
              <div className="text-lg font-bold text-gray-900">SleepAI</div>
              <div className="text-xs text-gray-500">Personal sleep insights</div>
            </div>
          </div>

          <nav className="flex items-center gap-1">
            <Link 
              to="/" 
              className={`px-3 py-2 rounded-md text-sm font-medium ${isActive('/') ? 'bg-[--accent]/10 text-[--accent]' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}
            >
              Dashboard
            </Link>
            <Link 
              to="/history" 
              className={`px-3 py-2 rounded-md text-sm font-medium ${isActive('/history') ? 'bg-[--accent]/10 text-[--accent]' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}
            >
              History
            </Link>
            {token ? (
              <button 
                onClick={()=>{useUserStore.getState().logout(); window.location='/login'}} 
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              >
                Logout
              </button>
            ) : (
              <Link 
                to="/login" 
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              >
                Login
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}
