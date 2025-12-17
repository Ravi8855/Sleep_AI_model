import React, {useEffect, useState} from 'react'
import AdviceCard from './AdviceCard'
import TrendsChart from './TrendsChart'
import api from '../api/client'

function ScoreCard({score, date, subtitle}){
  return (
    <div className="card p-6 flex flex-col items-center justify-center text-center">
      <div className="text-sm font-medium text-muted mb-2">{subtitle}</div>
      <div className="text-4xl font-bold text-[--accent]">{score ?? '--'}</div>
      <div className="text-xs text-muted mt-2">{date ?? '—'}</div>
    </div>
  )
}

function StatCard({title, value, icon}) {
  return (
    <div className="flex items-center p-3 rounded-lg bg-white/50">
      <div className="mr-3 text-[--accent]">{icon}</div>
      <div>
        <div className="text-xs text-muted">{title}</div>
        <div className="font-semibold">{value}</div>
      </div>
    </div>
  );
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
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    if (score >= 20) return 'Poor';
    return 'Very Poor';
  };
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ScoreCard 
          score={latest ? Math.round(latest.score) : '--'} 
          date={latest ? new Date(latest.date).toLocaleDateString() : null}
          subtitle="Today's Sleep Score"
        />
        <div className='col-span-2 card p-4'>
          <h4 className='text-sm font-medium text-muted mb-3'>Quick Stats</h4>
          <div className='grid grid-cols-3 gap-2'>
            <StatCard title="Avg Sleep" value={stats.avgSleep} icon="😴" />
            <StatCard title="Awakenings" value={stats.awakenings} icon="⏰" />
            <StatCard title="Consistency" value={stats.consistency} icon="📊" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="card p-4">
          <h4 className='text-sm font-medium text-muted mb-2'>Sleep Quality</h4>
          <div className="text-2xl font-bold">{latest ? getSleepQuality(latest.score) : '--'}</div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
            <div 
              className="bg-[--accent] h-2 rounded-full" 
              style={{ width: `${latest ? Math.min(100, Math.max(0, latest.score)) : 0}%` }}
            ></div>
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

      <AdviceCard advice={latest ? `Based on your sleep score of ${Math.round(latest.score)}, aim for consistent bedtimes and reduce screen time before bed.` : 'No advice yet'} />

      <div className='card p-4'>
        <h3 className='text-lg font-semibold mb-4'>Weekly Trend</h3>
        <TrendsChart />
      </div>
    </div>
  )
}
