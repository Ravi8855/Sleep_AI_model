import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import useUserStore from '../store/userStore'

export default function NavBar(){
  const location = useLocation()
  const navigate = useNavigate()
  const { token, logout } = useUserStore()
  
  const isActive = (path) => location.pathname === path
  
  const handleLogout = () => {
    logout()
    navigate('/login')
  }
  
  return (
    <header className="bg-white shadow-md border-b border-panel sticky top-0 z-50 backdrop-blur-sm bg-white/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-teal-400 flex items-center justify-center shadow-lg">
              <span className="text-white text-2xl">💤</span>
            </div>
            <div>
              <div className="text-xl font-bold text-primary">SleepAI</div>
              <div className="text-sm text-muted">Personal sleep insights</div>
            </div>
          </div>

          <nav className="flex items-center gap-2">
            <Link 
              to="/" 
              className={`px-4 py-2 rounded-xl text-base font-semibold transition-all duration-200 ${isActive('/') ? 'bg-accent text-white shadow-md' : 'text-primary hover:bg-blue-50'}`}
            >
              Dashboard
            </Link>
            <Link 
              to="/history" 
              className={`px-4 py-2 rounded-xl text-base font-semibold transition-all duration-200 ${isActive('/history') ? 'bg-accent text-white shadow-md' : 'text-primary hover:bg-blue-50'}`}
            >
              History
            </Link>
            <Link 
              to="/goals" 
              className={`px-4 py-2 rounded-xl text-base font-semibold transition-all duration-200 ${isActive('/goals') ? 'bg-accent text-white shadow-md' : 'text-primary hover:bg-blue-50'}`}
            >
              Goals
            </Link>
            <Link 
              to="/coach" 
              className={`px-4 py-2 rounded-xl text-base font-semibold transition-all duration-200 ${isActive('/coach') ? 'bg-accent text-white shadow-md' : 'text-primary hover:bg-blue-50'}`}
            >
              Coach
            </Link>
            <Link 
              to="/guidelines" 
              className={`px-4 py-2 rounded-xl text-base font-semibold transition-all duration-200 ${isActive('/guidelines') ? 'bg-accent text-white shadow-md' : 'text-primary hover:bg-blue-50'}`}
            >
              Guidelines
            </Link>
            
            {token ? (
              <button 
                onClick={handleLogout}
                className="px-4 py-2 rounded-xl text-base font-semibold text-primary hover:bg-red-50 transition-all duration-200"
              >
                Logout
              </button>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className={`px-4 py-2 rounded-xl text-base font-semibold transition-all duration-200 ${isActive('/login') ? 'bg-accent text-white shadow-md' : 'text-primary hover:bg-blue-50'}`}
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className={`px-4 py-2 rounded-xl text-base font-semibold transition-all duration-200 ${isActive('/register') ? 'bg-accent text-white shadow-md' : 'text-primary hover:bg-blue-50'}`}
                >
                  Register
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}
