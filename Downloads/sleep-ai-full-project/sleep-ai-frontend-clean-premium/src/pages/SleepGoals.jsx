import React, { useState, useEffect } from 'react';
import api from '../api/client';

export default function SleepGoals() {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    targetHours: 8,
    bedtime: '22:00',
    wakeTime: '06:00',
    consistencyDays: 7,
    startDate: new Date().toISOString().split('T')[0]
  });
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    fetchGoals();
    fetchAchievements();
  }, []);

  const fetchGoals = async () => {
    try {
      const response = await api.get('/goals');
      setGoals(response.data.data || []);
      
      // Mock achievements for now
      const mockAchievements = [
        { id: 1, title: 'First Week Complete', description: 'Completed your first sleep goal!', date: '2025-12-07', type: 'milestone' },
        { id: 2, title: 'Perfect Night', description: 'Achieved 95+ sleep score', date: '2025-12-10', type: 'quality' },
        { id: 3, title: 'Early Bird', description: 'Woke up before 6 AM for 5 days', date: '2025-12-15', type: 'consistency' }
      ];
      setAchievements(mockAchievements);
    } catch (error) {
      console.error('Error fetching goals:', error);
      // Fallback to mock data
      const mockGoals = [
        {
          id: 1,
          targetHours: 8,
          bedtime: '22:00',
          wakeTime: '06:00',
          consistencyDays: 7,
          startDate: '2025-12-01',
          progress: 65,
          streak: 3,
          status: 'active'
        }
      ];
      setGoals(mockGoals);
    } finally {
      setLoading(false);
    }
  };

  const fetchAchievements = async () => {
    // Achievements are fetched with goals for demo
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/goals', formData);
      if (response.data.success) {
        setGoals([...goals, response.data.data]);
        setShowForm(false);
        setFormData({
          targetHours: 8,
          bedtime: '22:00',
          wakeTime: '06:00',
          consistencyDays: 7,
          startDate: new Date().toISOString().split('T')[0]
        });
      }
    } catch (error) {
      console.error('Error creating goal:', error);
      // Fallback to local state for demo
      const newGoal = {
        id: goals.length + 1,
        ...formData,
        progress: 0,
        streak: 0,
        status: 'active'
      };
      setGoals([...goals, newGoal]);
      setShowForm(false);
      setFormData({
        targetHours: 8,
        bedtime: '22:00',
        wakeTime: '06:00',
        consistencyDays: 7,
        startDate: new Date().toISOString().split('T')[0]
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'targetHours' || name === 'consistencyDays' ? parseInt(value) : value
    }));
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 50) return 'bg-blue-500';
    if (progress >= 25) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getAchievementIcon = (type) => {
    switch (type) {
      case 'milestone': return '🏆';
      case 'quality': return '⭐';
      case 'consistency': return '📅';
      default: return '🏅';
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-muted">Loading sleep goals...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-primary mb-3 tracking-tight">Sleep Goals</h1>
        <p className="text-xl text-secondary font-medium">Set and track your sleep improvement goals</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Goals Section */}
        <div className="lg:col-span-2 space-y-8">
          <div className="card">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-panel">
              <h2 className="text-2xl font-extrabold text-primary">Active Goals</h2>
              <button 
                onClick={() => setShowForm(!showForm)}
                className="btn-accent px-4 py-2 rounded-xl text-base font-semibold"
              >
                {showForm ? 'Cancel' : 'New Goal'}
              </button>
            </div>

            {showForm && (
              <div className="mb-8 p-6 bg-blue-50 rounded-2xl border border-blue-100">
                <h3 className="text-xl font-bold text-primary mb-4">Create New Sleep Goal</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-primary mb-2">Target Hours</label>
                      <input
                        type="number"
                        name="targetHours"
                        value={formData.targetHours}
                        onChange={handleInputChange}
                        min="4"
                        max="12"
                        step="0.5"
                        className="w-full p-3 border border-panel rounded-xl focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-primary mb-2">Consistency Days</label>
                      <input
                        type="number"
                        name="consistencyDays"
                        value={formData.consistencyDays}
                        onChange={handleInputChange}
                        min="3"
                        max="30"
                        className="w-full p-3 border border-panel rounded-xl focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-primary mb-2">Target Bedtime</label>
                      <input
                        type="time"
                        name="bedtime"
                        value={formData.bedtime}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-panel rounded-xl focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-primary mb-2">Target Wake Time</label>
                      <input
                        type="time"
                        name="wakeTime"
                        value={formData.wakeTime}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-panel rounded-xl focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-primary mb-2">Start Date</label>
                    <input
                      type="date"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-panel rounded-xl focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200"
                    />
                  </div>
                  <div className="flex justify-end space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="px-4 py-2 rounded-xl text-base font-semibold text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn-accent px-4 py-2 rounded-xl text-base font-semibold"
                    >
                      Create Goal
                    </button>
                  </div>
                </form>
              </div>
            )}

            {goals.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-100 to-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-4xl">🎯</span>
                </div>
                <h3 className="text-2xl font-bold text-primary mb-3">No Active Goals</h3>
                <p className="text-lg text-secondary mb-6">Set your first sleep goal to start tracking your progress</p>
                <button 
                  onClick={() => setShowForm(true)}
                  className="btn-accent px-6 py-3 rounded-xl text-lg font-semibold"
                >
                  Create Your First Goal
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {goals.map((goal) => (
                  <div key={goal.id} className="p-6 border border-panel rounded-2xl bg-white hover:shadow-md transition-all duration-300">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-primary">Sleep Duration Goal</h3>
                        <p className="text-muted">Target: {goal.targetHours} hours per night</p>
                      </div>
                      <span className="px-3 py-1 rounded-full text-sm font-semibold bg-blue-100 text-blue-800">
                        Active
                      </span>
                    </div>
                    
                    <div className="mb-4">
                      <div className="flex justify-between text-sm font-semibold text-primary mb-2">
                        <span>Progress: {goal.progress}%</span>
                        <span>{goal.streak} day streak</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className={`h-3 rounded-full ${getProgressColor(goal.progress)}`}
                          style={{ width: `${goal.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-panel">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">{goal.targetHours}</div>
                        <div className="text-sm text-muted">Target Hours</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">{goal.consistencyDays}</div>
                        <div className="text-sm text-muted">Days</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">{goal.bedtime}</div>
                        <div className="text-sm text-muted">Bedtime</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">{goal.wakeTime}</div>
                        <div className="text-sm text-muted">Wake Time</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Achievements Section */}
        <div className="space-y-8">
          <div className="card">
            <h2 className="text-2xl font-extrabold text-primary mb-6 pb-4 border-b border-panel">Achievements</h2>
            
            {achievements.length === 0 ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🏅</span>
                </div>
                <p className="text-muted">Complete sleep goals to earn achievements</p>
              </div>
            ) : (
              <div className="space-y-4">
                {achievements.map((achievement) => (
                  <div key={achievement.id} className="flex items-start p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-100">
                    <div className="text-2xl mr-3">{getAchievementIcon(achievement.type)}</div>
                    <div className="flex-1">
                      <h4 className="font-bold text-primary">{achievement.title}</h4>
                      <p className="text-sm text-muted mb-1">{achievement.description}</p>
                      <p className="text-xs text-gray-500">{new Date(achievement.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="card">
            <h2 className="text-2xl font-extrabold text-primary mb-4">Tips for Success</h2>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-accent mr-2">✓</span>
                <span className="text-muted">Set realistic initial goals</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-2">✓</span>
                <span className="text-muted">Maintain consistent sleep schedule</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-2">✓</span>
                <span className="text-muted">Track progress daily</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-2">✓</span>
                <span className="text-muted">Celebrate small wins</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}