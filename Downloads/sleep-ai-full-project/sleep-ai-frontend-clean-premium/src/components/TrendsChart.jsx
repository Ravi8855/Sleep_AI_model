import React, {useEffect, useState} from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Label } from 'recharts'
import api from '../api/client'

export default function TrendsChart(){
  const [data,setData]=useState([])
  const [loading, setLoading] = useState(true)
  
  useEffect(()=> {
    setLoading(true)
    api.get('/trends/weekly')
      .then(r=> {
        setData(r.data?.data || [])
      })
      .catch((e)=>{ 
        console.error('trend chart error', e)
        setData([])
      })
      .finally(() => {
        setLoading(false)
      })
  },[])
  
  // Count occurrences of each date
  const dateCounts = {};
  data.forEach(d => {
    const dateStr = new Date(d.date).toLocaleDateString('en-US');
    dateCounts[dateStr] = (dateCounts[dateStr] || 0) + 1;
  });
  
  // Format data for chart
  const formatted = data.map((d, index) => {
    const dateObj = new Date(d.date);
    const dateStr = dateObj.toLocaleDateString('en-US');
    const timeStr = dateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    
    // If multiple entries for the same date, include time
    const displayDate = dateCounts[dateStr] > 1 
      ? `${dateObj.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}\n${timeStr}`
      : dateObj.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    
    return {
      date: displayDate,
      time: timeStr,
      fullDate: dateObj.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' }),
      score: Math.round(d.score),
      index
    };
  }).reverse() // Reverse to show oldest first
  
  // Calculate average
  const average = formatted.length > 0 
    ? formatted.reduce((sum, item) => sum + item.score, 0) / formatted.length 
    : 0
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-muted">Loading trend data...</div>
      </div>
    )
  }
  
  return (
    <div className="p-2">
      {formatted.length===0 ? (
        <div className="flex items-center justify-center h-64">
          <div className="text-muted text-center">
            <div className="text-lg mb-2">No trend data available</div>
            <div className="text-sm">Start tracking your sleep to see trends</div>
          </div>
        </div>
      ) : (
        <div>
          <div className="mb-4 flex justify-between items-center">
            <div className="text-sm text-muted">
              Last {formatted.length} days
            </div>
            <div className="text-sm">
              Average: <span className="font-semibold text-[--accent]">{average.toFixed(1)}</span>
            </div>
          </div>
          <div style={{width:'100%', height:280}}>
            <ResponsiveContainer>
              <LineChart data={formatted} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                <XAxis 
                  dataKey="date" 
                  stroke="#6b7280" 
                  tick={{ fontSize: 10 }}
                  tickLine={false}
                  angle={-45}
                  textAnchor="end"
                  height={70}
                >
                  <Label value="Date" offset={-5} position="insideBottom" />
                </XAxis>
                <YAxis 
                  domain={[0,100]} 
                  stroke="#6b7280" 
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip 
                  contentStyle={{ 
                    background: '#fff', 
                    borderRadius: 8, 
                    border: '1px solid #eee',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                  }} 
                  formatter={(value) => [`${value}`, 'Sleep Score']}
                  labelFormatter={(label, payload) => {
                    const item = payload[0];
                    return item ? `${item.payload.fullDate} at ${item.payload.time}` : '';
                  }}
                />
                <ReferenceLine 
                  y={average} 
                  stroke="#0ea5a4" 
                  strokeDasharray="3 3" 
                  strokeWidth={1}
                >
                  <Label 
                    value={`Avg: ${average.toFixed(1)}`} 
                    position="top" 
                    fill="#0ea5a4" 
                    fontSize={12} 
                  />
                </ReferenceLine>
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#0ea5a4" 
                  strokeWidth={3} 
                  dot={{ 
                    r: 4, 
                    fill: '#fff', 
                    strokeWidth: 2, 
                    stroke: '#0ea5a4' 
                  }} 
                  activeDot={{ r: 6, stroke: '#0ea5a4', strokeWidth: 2, fill: '#fff' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  )
}
