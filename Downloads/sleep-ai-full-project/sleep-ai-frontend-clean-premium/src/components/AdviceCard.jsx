import React from 'react'

export default function AdviceCard({advice}){
  return (
    <div className='card p-5 bg-gradient-to-r from-blue-50 to-teal-50 border-l-4 border-[--accent]'>
      <div className='flex items-start'>
        <div className='mr-3 mt-1 text-[--accent]'>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
        <div>
          <h4 className='font-bold text-gray-800 flex items-center'>
            <span>AI Sleep Insights</span>
            <span className='ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-[--accent]/10 text-[--accent]'>
              AI-Powered
            </span>
          </h4>
          <p className='mt-2 text-gray-600'>{advice}</p>
        </div>
      </div>
    </div>
  )
}
