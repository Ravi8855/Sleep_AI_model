import React from 'react'
import SleepForm from '../components/SleepForm'
import Dashboard from '../components/Dashboard'

export default function Home(){
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Sleep Tracker Dashboard</h1>
        <p className="mt-2 text-gray-600">Track and improve your sleep quality with AI-powered insights</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <aside className="lg:col-span-1">
          <div className="sticky top-6">
            <SleepForm />
          </div>
        </aside>

        <section className="lg:col-span-2 space-y-6">
          <div className="card p-6">
            <Dashboard />
          </div>
        </section>
      </div>
    </div>
  )
}
