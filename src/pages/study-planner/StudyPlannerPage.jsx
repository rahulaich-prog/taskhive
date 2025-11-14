import React, { useState, useRef, useEffect } from 'react'
import { Send, Bot, User, Calendar, BookOpen, Target, Clock, Plus, Sidebar, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

// Import components
import ChatMessage from './components/ChatMessage'
import StudyPlanSidebar from './components/StudyPlanSidebar'
import QuickActions from './components/QuickActions'

// Import sample data and prompts
import { samplePlans, quickPrompts, aiResponses } from './data/plannerData'

const StudyPlannerPage = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: `Hello! I'm your AI Study Planner assistant. I can help you create personalized study plans, set goals, track progress, and optimize your learning schedule.

How can I help you today? You can:
• Create a new study plan
• Get help with time management
• Set up study goals
• Review your progress
• Ask questions about effective studying

What would you like to work on?`,
      timestamp: new Date()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [currentPlan, setCurrentPlan] = useState(null)
  
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Focus input on component mount
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  // Simulate AI response
  const generateAIResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase()
    
    // Check for specific keywords and return appropriate responses
    if (lowerMessage.includes('study plan') || lowerMessage.includes('create plan')) {
      return aiResponses.createPlan
    } else if (lowerMessage.includes('schedule') || lowerMessage.includes('time')) {
      return aiResponses.timeManagement
    } else if (lowerMessage.includes('goal') || lowerMessage.includes('target')) {
      return aiResponses.goalSetting
    } else if (lowerMessage.includes('progress') || lowerMessage.includes('track')) {
      return aiResponses.progressTracking
    } else if (lowerMessage.includes('exam') || lowerMessage.includes('test')) {
      return aiResponses.examPrep
    } else if (lowerMessage.includes('motivation') || lowerMessage.includes('help')) {
      return aiResponses.motivation
    } else {
      return aiResponses.general
    }
  }

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsLoading(true)

    // Simulate AI processing time
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        type: 'ai',
        content: generateAIResponse(inputMessage),
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, aiResponse])
      setIsLoading(false)
    }, 1000 + Math.random() * 2000) // Random delay between 1-3 seconds
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleQuickPrompt = (prompt) => {
    setInputMessage(prompt)
    inputRef.current?.focus()
  }

  const clearChat = () => {
    setMessages([
      {
        id: 1,
        type: 'ai',
        content: `Hello! I'm your AI Study Planner assistant. How can I help you create an effective study plan today?`,
        timestamp: new Date()
      }
    ])
  }

  return (
    <div className="dark">
      <div className="h-screen bg-gray-900 text-white flex">
        {/* Sidebar */}
        <StudyPlanSidebar 
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        plans={samplePlans}
        currentPlan={currentPlan}
        setCurrentPlan={setCurrentPlan}
        onClearChat={clearChat}
      />

      {/* Main Chat Interface */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="border-b border-gray-700 bg-gray-900/80 backdrop-blur-lg sticky top-0 z-10">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden text-white hover:bg-gray-800"
              >
                <Sidebar className="h-5 w-5" />
              </Button>
              
              <Link to="/" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                <BookOpen className="h-5 w-5" />
                <span className="hidden sm:inline">Back to TaskHive</span>
              </Link>
              
              <div className="h-6 w-px bg-gray-600 hidden sm:block" />
              
              <div className="flex items-center gap-2">
                <Bot className="h-6 w-6 text-blue-400" />
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  AI Study Planner
                </h1>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={clearChat}
                className="hidden sm:flex"
              >
                New Chat
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="hidden lg:flex"
              >
                <Sidebar className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </header>

        {/* Chat Messages Area */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto">
            {/* Welcome Message for empty chat */}
            {messages.length === 1 && (
              <div className="p-6">
                <QuickActions onSelectPrompt={handleQuickPrompt} />
              </div>
            )}

            {/* Messages */}
            <div className="space-y-4 p-4">
              {messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  message={message}
                  isLoading={false}
                />
              ))}
              
              {/* Loading message */}
              {isLoading && (
                <ChatMessage
                  message={{
                    id: 'loading',
                    type: 'ai',
                    content: 'Thinking...',
                    timestamp: new Date()
                  }}
                  isLoading={true}
                />
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </div>
        </div>

        {/* Input Area */}
        <div className="border-t border-gray-700 bg-gray-900 p-4">
          <div className="max-w-4xl mx-auto">
            <div className="relative flex items-end gap-3">
              <div className="flex-1 relative">
                <textarea
                  ref={inputRef}
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me about creating study plans, setting goals, time management..."
                  className="w-full resize-none rounded-xl border border-gray-600 bg-gray-800 text-white placeholder-gray-400 px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[44px] max-h-32"
                  rows={1}
                  disabled={isLoading}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isLoading}
                  size="sm"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-lg p-2"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <p className="text-xs text-gray-500 mt-2 text-center">
              AI Study Planner can make mistakes. Please verify important information and deadlines.
            </p>
          </div>
        </div>
      </div>

      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      </div>
    </div>
  )
}

export default StudyPlannerPage