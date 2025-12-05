import React from 'react'
import { Calendar, Target, Clock, BookOpen, Brain, TrendingUp, Zap, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'

const QuickActions = ({ onSelectPrompt }) => {
  const quickActions = [
    {
      icon: Calendar,
      title: 'Create Study Schedule',
      description: 'Build a personalized study timetable',
      prompt: 'I need help creating a study schedule. I have [X] subjects to cover and [Y] hours available per day. Can you help me plan an effective schedule?',
      color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'
    },
    {
      icon: Target,
      title: 'Set Study Goals',
      description: 'Define clear, achievable objectives',
      prompt: 'Help me set SMART study goals for my upcoming exams. I want to improve my performance in [subject] and need a structured approach.',
      color: 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
    },
    {
      icon: Clock,
      title: 'Time Management',
      description: 'Optimize your study time effectively',
      prompt: 'I struggle with time management while studying. Can you suggest techniques and strategies to make my study sessions more productive?',
      color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400'
    },
    {
      icon: Brain,
      title: 'Study Techniques',
      description: 'Learn effective study methods',
      prompt: 'What are the most effective study techniques for [subject/type of content]? I want to improve my retention and understanding.',
      color: 'bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400'
    },
    {
      icon: TrendingUp,
      title: 'Track Progress',
      description: 'Monitor your learning journey',
      prompt: 'How can I effectively track my study progress and identify areas that need more attention? I want to measure my improvement over time.',
      color: 'bg-pink-100 text-pink-700 dark:bg-pink-900/20 dark:text-pink-400'
    },
    {
      icon: Zap,
      title: 'Exam Preparation',
      description: 'Prepare for upcoming tests',
      prompt: 'I have an exam in [X] days covering [subjects/topics]. Can you create a comprehensive exam preparation plan with a study schedule?',
      color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400'
    }
  ]

  const studyTips = [
    {
      title: '🎯 Pomodoro Technique',
      description: '25 minutes focused study + 5 minute break'
    },
    {
      title: '📚 Active Recall',
      description: 'Test yourself instead of just re-reading'
    },
    {
      title: '🔄 Spaced Repetition',
      description: 'Review material at increasing intervals'
    },
    {
      title: '🧠 Feynman Method',
      description: 'Explain concepts in simple terms'
    }
  ]

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Welcome Message */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Welcome to AI Study Planner
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Your intelligent study companion that helps create personalized plans, track progress, and optimize your learning journey.
        </p>
      </div>

      {/* Quick Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {quickActions.map((action, index) => (
          <button
            key={index}
            onClick={() => onSelectPrompt(action.prompt)}
            className="p-6 rounded-xl border border-gray-700 hover:border-blue-400 transition-all duration-300 hover:shadow-lg text-left group bg-gray-800"
          >
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-lg ${action.color} group-hover:scale-110 transition-transform duration-300`}>
                <action.icon className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-2 text-white group-hover:text-blue-400 transition-colors">
                  {action.title}
                </h3>
                <p className="text-gray-400 text-sm">
                  {action.description}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Study Tips */}
      <div className="bg-gray-800/50 rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">📖 Quick Study Tips</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {studyTips.map((tip, index) => (
            <div key={index} className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <h3 className="font-semibold text-lg mb-2 text-white">{tip.title}</h3>
              <p className="text-gray-400 text-sm">{tip.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Sample Prompts */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-center text-white">💡 Try asking me...</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            "Create a 30-day study plan for my final exams",
            "How can I improve my focus while studying?",
            "What's the best way to memorize vocabulary?",
            "Help me balance multiple subjects effectively",
            "How do I overcome procrastination?",
            "Create a revision schedule for next week"
          ].map((prompt, index) => (
            <button
              key={index}
              onClick={() => onSelectPrompt(prompt)}
              className="p-4 rounded-lg border border-gray-700 text-left hover:border-blue-400 hover:bg-gray-800 transition-colors bg-gray-900"
            >
              <p className="text-sm text-white">{prompt}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default QuickActions