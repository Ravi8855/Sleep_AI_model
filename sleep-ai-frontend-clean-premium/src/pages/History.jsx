import React, {useEffect, useState} from 'react'
import api from '../api/client'

export default function History(){
  const [logs,setLogs]=useState([])
  const [loading, setLoading] = useState(true)
  
  useEffect(()=> {
    setLoading(true)
    api.get('/trends/weekly')
      .then(r=> {
        setLogs(r.data?.data || [])
      })
      .catch((err) => {
        console.error('Failed to load history:', err)
        setLogs([])
      })
      .finally(() => {
        setLoading(false)
      })
  },[])
  
  const getSleepQuality = (score) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    if (score >= 20) return 'Poor';
    return 'Very Poor';
  };
  
  const getQualityColor = (score) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-blue-600 bg-blue-100';
    if (score >= 40) return 'text-yellow-600 bg-yellow-100';
    if (score >= 20) return 'text-orange-600 bg-orange-100';
    return 'text-red-600 bg-red-100';
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 fade-in">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-primary mb-3 tracking-tight">Sleep History</h1>
        <p className="text-xl text-secondary font-medium">View your past sleep records and trends</p>
      </div>
      
      <div className="card">
        <div className="flex justify-between items-center mb-8 pb-4 border-b border-panel">
          <h2 className="text-2xl font-extrabold text-primary">Recent Sleep Logs</h2>
          <div className="text-base font-semibold text-muted">
            Showing {logs.length} records
          </div>
        </div>
        
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-muted flex flex-col items-center">
              <div className="animate-pulse mb-3">
                <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
              </div>
              Loading sleep history...
            </div>
          </div>
        ) : logs.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gradient-to-r from-blue-100 to-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">😴</span>
            </div>
            <h3 className="text-2xl font-bold text-primary mb-3">No sleep logs found</h3>
            <p className="text-lg text-secondary mb-8 max-w-md mx-auto">Start tracking your sleep to see your history here</p>
            <a href="/" className="btn-accent px-6 py-3 rounded-xl text-lg font-semibold">Add Sleep Log</a>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-panel shadow-sm">
            <table className="min-w-full divide-y divide-panel">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-4 text-left text-sm font-extrabold text-primary uppercase tracking-wide">Date</th>
                  <th scope="col" className="px-6 py-4 text-left text-sm font-extrabold text-primary uppercase tracking-wide">Duration</th>
                  <th scope="col" className="px-6 py-4 text-left text-sm font-extrabold text-primary uppercase tracking-wide">Sleep Score</th>
                  <th scope="col" className="px-6 py-4 text-left text-sm font-extrabold text-primary uppercase tracking-wide">Quality</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-panel">
                {[...logs].reverse().map((log, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-5 whitespace-nowrap text-base font-semibold text-primary">
                      <div>
                        {new Date(log.date).toLocaleDateString('en-US', { 
                          weekday: 'short', 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </div>
                      <div className="text-gray-600 text-xs font-medium">
                        {new Date(log.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-700">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-blue-100 text-blue-800">
                        {log.duration ? `${log.duration} hrs` : 'N/A'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-lg font-extrabold text-gray-900">{Math.round(log.score || log.prediction?.sleep_score || 0)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-bold ${getQualityColor(log.score || log.prediction?.sleep_score || 0)}`}>
                        {getSleepQuality(log.score || log.prediction?.sleep_score || 0)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

