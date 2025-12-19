import React, { useState, useEffect, useRef } from 'react';
import api from '../api/client';

export default function SleepCoach() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello there! 🌙 I'm Zoya, your personal sleep assistant. I'm here to help you get the best rest possible with friendly advice and personalized tips. What would you like to know about your sleep?",
      sender: 'coach',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [sleepData, setSleepData] = useState(null);
  const messagesEndRef = useRef(null);

  // Fetch real sleep data
  useEffect(() => {
    const fetchSleepData = async () => {
      try {
        const response = await api.get('/sleep/logs');
        setSleepData(response.data.data || []);
      } catch (error) {
        console.log('Could not fetch sleep data, using sample data');
        // Sample data for demo
        setSleepData([
          { duration: 7.5, prediction: { sleep_score: 72 }, date: '2025-12-18' },
          { duration: 6.8, prediction: { sleep_score: 65 }, date: '2025-12-17' },
          { duration: 8.2, prediction: { sleep_score: 80 }, date: '2025-12-16' }
        ]);
      }
    };
    
    fetchSleepData();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Process real sleep data
  const analyzeSleepData = () => {
    if (!sleepData || sleepData.length === 0) return null;
    
    const scores = sleepData.map(log => log.prediction?.sleep_score || 0);
    const durations = sleepData.map(log => log.duration || 0);
    
    const avgScore = scores.reduce((a, b) => a + b, 0) / scores.length;
    const avgDuration = durations.reduce((a, b) => a + b, 0) / durations.length;
    
    // Simple trend analysis
    const recentScore = scores[0] || 0;
    const previousScore = scores[1] || 0;
    const trend = recentScore > previousScore ? 'improving' : recentScore < previousScore ? 'declining' : 'stable';
    
    return {
      avgScore: Math.round(avgScore),
      avgDuration: avgDuration.toFixed(1),
      trend,
      totalLogs: sleepData.length
    };
  };

  const generateCoachResponse = (userMessage) => {
    const lowerMsg = userMessage.toLowerCase();
    const analysis = analyzeSleepData();
      
    // Friendly personality responses
    if (lowerMsg.includes('hello') || lowerMsg.includes('hi') || lowerMsg.includes('hey')) {
      return "Hi! 👋 I'm Zoya, your sleep assistant. How's your sleep going?";
    }
      
    if (lowerMsg.includes('how') && lowerMsg.includes('sleep')) {
      if (!analysis) {
        return "I don't see any sleep data yet. Did you log your sleep?";
      }
        
      return `You're averaging ${analysis.avgDuration} hours with a score of ${analysis.avgScore}/100. Trend: ${analysis.trend}.`;
    }
      
    if (lowerMsg.includes('tip') || lowerMsg.includes('advice') || lowerMsg.includes('help')) {
      return "Here are 3 quick tips:\n\n1. 📱 No phones 30 mins before bed\n2. 🌙 Cool room (68°F)\n3. 😴 4-7-8 breathing\n\nTry these tonight!";
    }
      
    if (lowerMsg.includes('score') || lowerMsg.includes('quality')) {
      if (!analysis) {
        return "No sleep scores yet. Log your sleep first!";
      }
        
      const feedback = analysis.avgScore >= 80 
        ? "Excellent! 🎉"
        : analysis.avgScore >= 60 
        ? "Good! 👍"
        : "Needs work! 💪";
        
      return `Your score: ${analysis.avgScore}/100. ${feedback}`;
    }
      
    if (lowerMsg.includes('goal') || lowerMsg.includes('target')) {
      return "🎯 Great! Here's what I suggest:\n\n⏰ Bedtime: 10:00 PM\n⏰ Wake: 6:00 AM\n\nCan you try this for a week?";
    }
      
    if (lowerMsg.includes('trend') || lowerMsg.includes('progress')) {
      if (!analysis) {
        return "Need more data. Log more sleeps!";
      }
        
      const encouragement = analysis.trend === 'improving' 
        ? "🔥 Getting better!"
        : analysis.trend === 'declining' 
        ? "📉 Let's fix this."
        : "➡️ Steady progress.";
        
      return `Trend: ${analysis.trend}. ${encouragement} ${analysis.totalLogs} nights logged.`;
    }
      
    if (lowerMsg.includes('thank')) {
      return "You're welcome! 😴 Sweet dreams!";
    }
      
    // Special response for questions about Zoya
    if (lowerMsg.includes('who') && lowerMsg.includes('zoya') || lowerMsg.includes('what') && lowerMsg.includes('you')) {
      return "I'm Zoya! 🌙 Your sleep assistant. I help you sleep better with personalized tips based on your data.";
    }
    
    // Default friendly response
    return "Ask me about:\n\n💬 Sleep scores\n💡 Tips for better sleep\n🎯 Goals\n📈 Your trends\n\nWhat do you want to know?";
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;
    
    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setLoading(true);
    
    // Simulate typing delay
    setTimeout(() => {
      const coachResponse = {
        id: messages.length + 2,
        text: generateCoachResponse(inputText),
        sender: 'coach',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, coachResponse]);
      setLoading(false);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-primary mb-3 tracking-tight">Meet Zoya</h1>
        <p className="text-xl text-secondary font-medium">Your personal sleep assistant</p>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="card">
          <div className="p-6 border-b border-panel">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center">
                <span className="text-white text-xl">🌙</span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-primary">Zoya, Your Sleep Coach</h2>
                <p className="text-sm text-muted">Always here with friendly advice and encouragement</p>
              </div>
            </div>
          </div>

          <div className="h-96 overflow-y-auto p-4 bg-gray-50 rounded-b-2xl">
            <div className="space-y-4">
              {messages.map((message) => (
                <div 
                  key={message.id} 
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                      message.sender === 'user' 
                        ? 'bg-accent text-white rounded-br-none' 
                        : 'bg-white border border-panel rounded-bl-none shadow-sm'
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{message.text}</div>
                    <div 
                      className={`text-xs mt-1 ${
                        message.sender === 'user' ? 'text-accent-100' : 'text-gray-500'
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              ))}
              
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-panel rounded-2xl rounded-bl-none shadow-sm px-4 py-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          <div className="p-4 border-t border-panel">
            <div className="flex gap-2">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Chat with Zoya about your sleep, tips, goals, or trends..."
                className="flex-1 p-3 border border-panel rounded-xl focus:ring-2 focus:ring-accent focus:border-transparent resize-none"
                rows="2"
              />
              <button
                onClick={handleSendMessage}
                disabled={loading || !inputText.trim()}
                className="btn-accent px-6 py-3 rounded-xl font-semibold self-end disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Send
              </button>
            </div>
            <div className="mt-2 text-xs text-muted">
              Try: "How's my sleep?", "Need help!", "What's my score?", "Set a goal"
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📊</span>
            </div>
            <h3 className="text-lg font-bold text-primary mb-2">Personalized Insights</h3>
            <p className="text-muted">Advice based on YOUR actual sleep data</p>
          </div>
          
          <div className="card p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">💡</span>
            </div>
            <h3 className="text-lg font-bold text-primary mb-2">Friendly Tips</h3>
            <p className="text-muted">Actionable advice with encouragement</p>
          </div>
          
          <div className="card p-6 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🎯</span>
            </div>
            <h3 className="text-lg font-bold text-primary mb-2">Goal Support</h3>
            <p className="text-muted">Help setting and cheering for your goals</p>
          </div>
        </div>
      </div>
    </div>
  );
}