import React from 'react'
import SleepForm from '../components/SleepForm'
import Dashboard from '../components/Dashboard'

export default function Home(){
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 fade-in">
      <div className="mb-10 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">Sleep Tracker Dashboard</h1>
        <p className="text-xl text-secondary max-w-3xl mx-auto">Track and improve your sleep quality with AI-powered insights</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <aside className="lg:col-span-1">
          <div className="sticky top-8">
            <SleepForm />
          </div>
        </aside>

        <section className="lg:col-span-2 space-y-8">
          <div className="card">
            <Dashboard />
          </div>
        </section>
      </div>
    </div>
  )
}
