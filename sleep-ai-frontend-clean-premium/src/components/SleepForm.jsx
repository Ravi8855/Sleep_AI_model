import React, { useState } from 'react';
import api from '../api/client';
import useUserStore from '../store/userStore';

export default function SleepForm() {
  const [form, setForm] = useState({
    date: new Date().toISOString().slice(0, 10),
    duration: 7,
    startTime: '23:00',
    endTime: '06:00',
    awakenings: 0,
    stress: 3,
    caffeine: 0,
    screenTime: 30,
    exercise: 30,
    mood: 4
  });

  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handle = (k, v) => setForm((prev) => ({ ...prev, [k]: v }));

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Debug: Check if token exists
    const token = localStorage.getItem("token");
    console.log('Token in SleepForm submit:', token);

    const res = await api.post(
  '/sleep/add',
  {
    date: form.date,
    startTime: form.startTime,
    endTime: form.endTime,
    duration: Number(form.duration),
    awakenings: Number(form.awakenings),
    stress: Number(form.stress),
    caffeine: Number(form.caffeine),
    screenTime: Number(form.screenTime),
    exercise: Number(form.exercise),
    mood: Number(form.mood)
  },
  {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
);


      
      setShowSuccess(true);
      // Reset form after successful submission
      setForm({
        date: new Date().toISOString().slice(0, 10),
        duration: 7,
        startTime: '23:00',
        endTime: '06:00',
        awakenings: 0,
        stress: 3,
        caffeine: 0,
        screenTime: 30,
        exercise: 30,
        mood: 4
      });
      // Hide success message after 3 seconds
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err) {
      console.error('Save error', err);
      console.error('Error response:', err.response);
      alert('Save failed: ' + (err.response?.data?.message || err.message || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  // Helper function to render slider inputs
  const SliderInput = ({ label, name, value, min, max, step = 1, onChange }) => (
    <div className="mb-5">
      <div className="flex justify-between mb-2">
        <label className="text-base font-semibold text-primary">{label}</label>
        <span className="text-lg font-bold text-accent">{value}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(name, parseFloat(e.target.value))}
        className="w-full h-3 bg-gray-200 rounded-full appearance-none cursor-pointer accent-accent"
      />
      <div className="flex justify-between text-sm text-muted mt-2">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );

  return (
    <div className="card">
      <div className="text-center mb-6">
        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-teal-400 flex items-center justify-center mx-auto mb-4 shadow-lg">
          <span className="text-2xl text-white">😴</span>
        </div>
        <h3 className="text-2xl font-bold text-primary">Sleep Tracker</h3>
        <p className="text-secondary mt-2">Log your sleep data for personalized insights</p>
      </div>
      
      {showSuccess && (
        <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 text-green-700 rounded-xl text-center shadow-sm">
          <div className="flex items-center justify-center">
            <span className="text-xl mr-2">✓</span>
            <span className="font-medium">Sleep log saved successfully!</span>
          </div>
        </div>
      )}

      <form onSubmit={submit} className="space-y-6">
        <div className="mb-2">
          <label className="block text-sm font-semibold text-primary mb-2">Date</label>
          <input
            type="date"
            value={form.date}
            onChange={(e) => handle('date', e.target.value)}
            className="w-full p-3 border border-panel rounded-xl focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-primary mb-2">Start Time</label>
            <input
              type="time"
              value={form.startTime}
              onChange={(e) => handle('startTime', e.target.value)}
              className="w-full p-3 border border-panel rounded-xl focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-primary mb-2">End Time</label>
            <input
              type="time"
              value={form.endTime}
              onChange={(e) => handle('endTime', e.target.value)}
              className="w-full p-3 border border-panel rounded-xl focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>

        <SliderInput 
          label="Sleep Duration (hours)" 
          name="duration" 
          value={form.duration} 
          min={1} 
          max={12} 
          step={0.25}
          onChange={handle} 
        />

        <SliderInput 
          label="Awakenings" 
          name="awakenings" 
          value={form.awakenings} 
          min={0} 
          max={10} 
          onChange={handle} 
        />

        <SliderInput 
          label="Stress Level" 
          name="stress" 
          value={form.stress} 
          min={1} 
          max={10} 
          onChange={handle} 
        />

        <SliderInput 
          label="Caffeine Intake (mg)" 
          name="caffeine" 
          value={form.caffeine} 
          min={0} 
          max={500} 
          step={10}
          onChange={handle} 
        />

        <SliderInput 
          label="Screen Time Before Bed (minutes)" 
          name="screenTime" 
          value={form.screenTime} 
          min={0} 
          max={180} 
          step={5}
          onChange={handle} 
        />

        <SliderInput 
          label="Exercise (minutes)" 
          name="exercise" 
          value={form.exercise} 
          min={0} 
          max={120} 
          step={5}
          onChange={handle} 
        />

        <SliderInput 
          label="Mood" 
          name="mood" 
          value={form.mood} 
          min={1} 
          max={10} 
          onChange={handle} 
        />

        <button 
          type="submit"
          className="btn-accent w-full py-4 font-bold text-lg rounded-xl transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl"
          disabled={loading}
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Saving...
            </>
          ) : (
            <>
              <span className="mr-2">💤</span>
              Save Sleep Log
            </>
          )}
        </button>
      </form>
    </div>
  );
}
