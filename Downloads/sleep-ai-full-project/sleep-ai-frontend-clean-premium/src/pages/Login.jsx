import React, {useState} from 'react'
import api from '../api/client'
import { useNavigate, Link } from 'react-router-dom'
import useUserStore from '../store/userStore'

export default function Login(){
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const setToken = useUserStore((s)=>s.setToken)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user starts typing
    if (error) setError('');
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try{
      const res = await api.post('/auth/login', {
        email: formData.email,
        password: formData.password
      });
      
      if (res.data.success) {
        setToken(res.data.token);
        navigate('/');
      } else {
        setError(res.data.message || 'Login failed');
      }
    }catch(err){
      console.error('login error', err);
      setError(err.response?.data?.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-teal-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 card p-8">
        <div>
          <div className="mx-auto h-12 w-12 rounded-full bg-gradient-to-r from-teal-500 to-blue-500 flex items-center justify-center">
            <span className="text-white text-xl">💤</span>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Track and improve your sleep quality
          </p>
        </div>
        
        {error && (
          <div className="rounded-md bg-red-50 p-4">
            <div className="text-sm text-red-700">{error}</div>
          </div>
        )}
        
        <form onSubmit={submit} className='space-y-6'>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
            <input 
              id="email"
              name="email"
              type="email"
              required 
              value={formData.email}
              onChange={handleChange}
              placeholder='you@example.com'
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[--accent] focus:border-[--accent] sm:text-sm'
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input 
              id="password"
              name="password"
              type="password"
              required 
              value={formData.password}
              onChange={handleChange}
              placeholder='••••••••'
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[--accent] focus:border-[--accent] sm:text-sm'
            />
          </div>
          
          <div>
            <button 
              type="submit"
              disabled={loading}
              className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[--accent] hover:bg-[--accent]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[--accent] disabled:opacity-50'
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
        </form>
        
        <div className="text-sm text-center">
          <span className="text-gray-600">Don't have an account? </span>
          <Link to='/register' className='font-medium text-[--accent] hover:text-[--accent]/80'>Sign up</Link>
        </div>
      </div>
    </div>
  )
}
