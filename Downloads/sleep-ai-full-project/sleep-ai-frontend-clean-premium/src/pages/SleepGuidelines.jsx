import React from 'react';

export default function SleepGuidelines() {
  const guidelines = [
    {
      title: "Sleep Duration (Hours)",
    
      do: [
        "Aim for 7.5 – 8.5 hours of sleep daily",
        "Keep a fixed sleep and wake time"
      ],
      dont: [
        "Sleep less than 6.5 hours",
        "Change sleep timings daily"
      ]
    },
    {
      title: "Sleep Timing",
      do: [
        "Go to bed between 10:45 – 11:30 PM",
        "Wake up between 6:00 – 6:30 AM"
      ],
      dont: [
        "Sleep after 12:30 AM regularly",
        "Stay awake late without a fixed reason"
      ]
    },
    {
      title: "Awakenings (During Sleep)",
      do: [
        "Target 0–1 awakenings per night"
      ],
      dont: [
        "Ignore frequent awakenings (3+ is unhealthy)",
        "Use phone when you wake up at night"
      ]
    },
    {
      title: "Stress Level (1–10)",
      do: [
        "Keep stress between 1 – 3",
        "Practice deep breathing or light stretching"
      ],
      dont: [
        "Go to bed stressed or anxious",
        "Work on deadlines right before sleep"
      ]
    },
    {
      title: "Caffeine Intake (mg)",
      do: [
        "Consume caffeine only in the morning",
        "Keep intake below 100 mg"
      ],
      dont: [
        "Take caffeine after 3 PM",
        "Exceed 200 mg per day"
      ]
    },
    {
      title: "Screen Time Before Bed (Minutes)",
      do: [
        "Limit screen use to 0 – 30 minutes",
        "Use night mode & low brightness"
      ],
      dont: [
        "Use screens for 90+ minutes",
        "Watch reels, gaming, or intense content at night"
      ]
    },
    {
      title: "Exercise (Minutes)",
      do: [
        "Exercise 30 – 45 minutes daily",
        "Finish workouts before 8 PM"
      ],
      dont: [
        "Skip exercise completely",
        "Do heavy workouts late at night"
      ]
    },
    {
      title: "Mood Level (1–10)",
      do: [
        "Maintain mood between 6 – 8",
        "Relax before bed with music or journaling"
      ],
      dont: [
        "Ignore low mood (1–3)",
        "Depend only on sleep to fix emotional stress"
      ]
    }
  ];

  const routine = {
    title: "Pre-Sleep Routine (Highly Recommended)",
    do: [
      "Read a book or listen to calm music",
      "Write tomorrow's task list",
      "Practice 5 minutes of deep breathing"
    ],
    dont: [
      "Scroll social media endlessly",
      "Check emails or work messages"
    ]
  };

  const score = {
    title: "Ideal Daily Sleep Score",
    levels: [
      { range: "8.5 – 10", label: "Excellent", color: "text-green-600" },
      { range: "7 – 8.4", label: "Good", color: "text-blue-600" },
      { range: "Below 7", label: "Needs Improvement", color: "text-orange-600" }
    ]
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans">
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">Sleep Guidelines</h1>
        <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
          Professional recommendations to optimize your sleep quality and overall well-being
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {guidelines.map((item, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div className="flex items-center mb-6">
              <span className="text-3xl mr-4">{item.icon}</span>
              <h2 className="text-2xl font-bold text-gray-900">{item.title}</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-green-50 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <span className="text-green-600 mr-3 text-2xl"></span>
                  <h3 className="text-xl font-bold text-green-800">Do</h3>
                </div>
                <ul className="space-y-3">
                  {item.do.map((point, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-green-600 mr-3 mt-1 text-lg">•</span>
                      <span className="text-gray-800 text-lg leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-red-50 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <span className="text-red-600 mr-3 text-2xl"></span>
                  <h3 className="text-xl font-bold text-red-800">Don't</h3>
                </div>
                <ul className="space-y-3">
                  {item.dont.map((point, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-red-600 mr-3 mt-1 text-lg">•</span>
                      <span className="text-gray-800 text-lg leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-8 mb-16 hover:shadow-xl transition-all duration-300 border border-gray-100">
        <div className="flex items-center mb-6">
          <span className="text-3xl mr-4">{routine.icon}</span>
          <h2 className="text-2xl font-bold text-gray-900">{routine.title}</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
            <div className="flex items-center mb-5">
              <span className="text-green-600 mr-3 text-3xl"></span>
              <h3 className="text-2xl font-bold text-green-800">Recommended Practices</h3>
            </div>
            <ul className="space-y-4">
              {routine.do.map((point, idx) => (
                <li key={idx} className="flex items-start bg-white p-4 rounded-lg shadow-sm border border-green-50">
                  <span className="text-green-600 mr-3 mt-1 text-xl"></span>
                  <span className="text-gray-800 text-lg leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-xl p-6 border border-red-100">
            <div className="flex items-center mb-5">
              <span className="text-red-600 mr-3 text-3xl"></span>
              <h3 className="text-2xl font-bold text-red-800">Avoid These Habits</h3>
            </div>
            <ul className="space-y-4">
              {routine.dont.map((point, idx) => (
                <li key={idx} className="flex items-start bg-white p-4 rounded-lg shadow-sm border border-red-50">
                  <span className="text-red-600 mr-3 mt-1 text-xl"></span>
                  <span className="text-gray-800 text-lg leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 border border-gray-100">
          <div className="flex items-center mb-6">
            <span className="text-3xl mr-4">{score.icon}</span>
            <h2 className="text-2xl font-bold text-gray-900">{score.title}</h2>
          </div>
          
          <div className="space-y-5">
            {score.levels.map((level, index) => (
              <div key={index} className="flex items-center justify-between p-5 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                <span className="text-xl font-medium text-gray-800">{level.range}</span>
                <span className={`text-xl font-bold ${level.color}`}>{level.label}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 border border-blue-100">
          <div className="flex items-center mb-6">
            <span className="text-3xl mr-4">💡</span>
            <h2 className="text-2xl font-bold text-gray-900">Pro Tip</h2>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-sm border border-blue-50">
            <p className="text-gray-800 text-xl font-medium leading-relaxed">
              Good sleep is not just about hours, but also habits before bed
            </p>
          </div>
        </div>
      </div>

      <div className="text-center py-12">
        <div className="inline-block p-8 bg-gradient-to-r from-teal-600 to-blue-700 text-white rounded-2xl shadow-xl">
          <h3 className="text-3xl font-bold mb-4">Sleep Well, Live Well</h3>
          <p className="text-xl font-bold text-gray-800 leading-relaxed bg-gradient-to-r from-blue-50 to-teal-50 p-4 rounded-xl border-l-4 border-accent shadow-sm">Follow these guidelines to achieve optimal sleep quality and enhance your daily performance</p>
        </div>
      </div>
    </div>
  );
}