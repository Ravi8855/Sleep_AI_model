import React, {useEffect, useState} from 'react'
import AdviceCard from './AdviceCard'
import TrendsChart from './TrendsChart'
import api from '../api/client'

function ScoreCard({score, date, subtitle}){
  return (
    <div className="card flex flex-col items-center justify-center text-center p-8 bg-gradient-to-br from-white to-blue-50 border border-panel rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
      <div className="text-base font-semibold text-muted mb-3">{subtitle}</div>
      <div className="text-5xl font-bold text-accent mb-2">{score ?? '--'}</div>
      <div className="text-sm text-muted">{date ?? '—'}</div>
    </div>
  )
}


export default function Dashboard(){
  const [latest, setLatest] = useState(null)
  const [stats, setStats] = useState({
    avgSleep: '--',
    awakenings: '--',
    consistency: '--'
  })
  
  useEffect(()=> {
    api.get('/trends/weekly').then(r=>{
      const arr = r.data?.data || []
      if(arr && arr.length) {
        setLatest(arr[arr.length-1])
        
        // Calculate stats
        const avgSleep = (arr.reduce((sum, item) => sum + (item.score || 0), 0) / arr.length).toFixed(1)
        const avgAwakenings = (arr.reduce((sum, item) => sum + (item.awakenings || 0), 0) / arr.length).toFixed(1)
        
        setStats({
          avgSleep: `${avgSleep}/100`,
          awakenings: avgAwakenings,
          consistency: `${Math.min(100, Math.max(0, 100 - (arr.length > 1 ? Math.abs(arr[0].score - arr[1].score) : 0))).toFixed(0)}%`
        })
      }
    }).catch((e)=>{ console.error('trend error', e) })
  },[])
  
  const getSleepQuality = (score) => {
    if (score >= 85) return 'Ideal';
    if (score >= 70) return 'Excellent';
    if (score >= 7) return 'Good';
    return 'Needs Improvement';
  };
  
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ScoreCard 
          score={latest ? Math.round(latest.score || latest.prediction?.sleep_score || 0) : '--'} 
          date={new Date().toLocaleDateString()}
          subtitle="Today's Sleep Score"
        />
        <div className='lg:col-span-2 bg-panel p-6 rounded-2xl'>
          <h4 className='text-xl font-extrabold text-primary mb-5 tracking-tight'>Quick Stats</h4>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            <div className='text-center'>
              <div className='text-base font-bold text-muted tracking-wide'>Avg Sleep</div>
              <div className='text-2xl font-extrabold text-primary mt-1'>{stats.avgSleep}</div>
            </div>
            <div className='text-center'>
              <div className='text-base font-bold text-muted tracking-wide'>Awakenings</div>
              <div className='text-2xl font-extrabold text-primary mt-1'>{stats.awakenings}</div>
            </div>
            <div className='text-center'>
              <div className='text-base font-bold text-muted tracking-wide'>Consistency</div>
              <div className='text-2xl font-extrabold text-primary mt-1'>{stats.consistency}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card p-6">
          <h4 className='text-lg font-bold text-primary mb-3'>Sleep Quality</h4>
          <div className="text-4xl font-bold text-accent mb-3">{latest ? getSleepQuality(latest.score || latest.prediction?.sleep_score || 0) : '--'}</div>
          <div className="w-full bg-gray-200 rounded-full h-4 mt-5">
            <div 
              className="bg-accent h-4 rounded-full" 
              style={{ width: `${latest ? Math.min(100, Math.max(0, latest.score || latest.prediction?.sleep_score || 0)) : 0}%` }}
            ></div>
          </div>
          <div className="text-center mt-3 text-lg font-semibold text-primary">
            {latest ? Math.round(latest.score || latest.prediction?.sleep_score || 0) : '--'}/100
          </div>
        </div>
        
        <div className="card p-4">
          <h4 className='text-sm font-medium text-muted mb-2'>Last Updated</h4>
          <div className="text-lg font-semibold">
            {latest ? new Date(latest.date).toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            }) : '--'}
          </div>
        </div>
      </div>

      <AdviceCard advice={latest ? `Based on your sleep score of ${Math.round(latest.score || latest.prediction?.sleep_score || 0)}, aim for consistent bedtimes and reduce screen time before bed.` : 'No advice yet'} />

      <div className='card p-4'>
        <h3 className='text-lg font-semibold mb-4'>Weekly Trend</h3>
        <TrendsChart />
      </div>
    </div>
  )
}
