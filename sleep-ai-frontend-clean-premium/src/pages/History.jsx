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
    if (score >= 85) return 'Ideal';
    if (score >= 70) return 'Excellent';
    if (score >= 7) return 'Good';
    return 'Needs Improvement';
  };
  
  const getQualityColor = (score) => {
    if (score >= 85) return 'text-purple-600 bg-purple-100';
    if (score >= 70) return 'text-green-600 bg-green-100';
    if (score >= 7) return 'text-blue-600 bg-blue-100';
    return 'text-red-600 bg-red-100';
  };
  
  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-4 sm:py-8 fade-in">
      <div className="mb-6 sm:mb-10 text-center">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-primary mb-2 sm:mb-3 tracking-tight">Sleep History</h1>
        <p className="text-base sm:text-lg lg:text-xl text-secondary font-medium">View your past sleep records and trends</p>
      </div>
      
      <div className="card p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 pb-4 border-b border-panel gap-2">
          <h2 className="text-xl sm:text-2xl font-extrabold text-primary">Recent Sleep Logs</h2>
          <div className="text-sm sm:text-base font-semibold text-muted">
            Showing {logs.length} records
          </div>
        </div>
        
        {loading ? (
          <div className="flex items-center justify-center h-48 sm:h-64">
            <div className="text-muted flex flex-col items-center">
              <div className="animate-pulse mb-3">
                <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
              </div>
              Loading sleep history...
            </div>
          </div>
        ) : logs.length === 0 ? (
          <div className="text-center py-12 sm:py-16">
            <div className="w-16 sm:w-24 h-16 sm:h-24 bg-gradient-to-r from-blue-100 to-teal-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <span className="text-2xl sm:text-4xl">😴</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-primary mb-2 sm:mb-3">No sleep logs found</h3>
            <p className="text-base sm:text-lg text-secondary mb-6 sm:mb-8 max-w-md mx-auto px-4">Start tracking your sleep to see your history here</p>
            <a href="/" className="btn-accent px-4 sm:px-6 py-2 sm:py-3 rounded-xl text-base sm:text-lg font-semibold">Add Sleep Log</a>
          </div>
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto rounded-2xl border border-panel shadow-sm">
              <table className="min-w-full divide-y divide-panel">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-extrabold text-primary uppercase tracking-wide">Date</th>
                    <th scope="col" className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-extrabold text-primary uppercase tracking-wide">Duration</th>
                    <th scope="col" className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-extrabold text-primary uppercase tracking-wide">Sleep Score</th>
                    <th scope="col" className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-extrabold text-primary uppercase tracking-wide">Quality</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-panel">
                  {[...logs].reverse().map((log, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition-colors duration-150">
                      <td className="px-4 sm:px-6 py-4 sm:py-5 whitespace-nowrap text-sm sm:text-base font-semibold text-primary">
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
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm font-semibold text-gray-700">
                        <span className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-bold bg-blue-100 text-blue-800">
                          {log.duration ? `${log.duration} hrs` : 'N/A'}
                        </span>
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                        <div className="text-base sm:text-lg font-extrabold text-gray-900">{Math.round(log.score || log.prediction?.sleep_score || 0)}</div>
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-bold ${getQualityColor(log.score || log.prediction?.sleep_score || 0)}`}>
                          {getSleepQuality(log.score || log.prediction?.sleep_score || 0)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-3">
              {[...logs].reverse().map((log, index) => (
                <div key={index} className="bg-white border border-panel rounded-xl p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-sm font-semibold text-primary">
                        {new Date(log.date).toLocaleDateString('en-US', { 
                          weekday: 'short', 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </div>
                      <div className="text-xs text-gray-600">
                        {new Date(log.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-bold ${getQualityColor(log.score || log.prediction?.sleep_score || 0)}`}>
                      {getSleepQuality(log.score || log.prediction?.sleep_score || 0)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                    <div>
                      <div className="text-xs font-semibold text-gray-600">Duration</div>
                      <div className="text-sm font-bold text-primary">{log.duration ? `${log.duration} hrs` : 'N/A'}</div>
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-gray-600">Score</div>
                      <div className="text-lg font-extrabold text-accent">{Math.round(log.score || log.prediction?.sleep_score || 0)}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
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

