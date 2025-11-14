import React from 'react'
import { Bot, User, Copy, ThumbsUp, ThumbsDown, Calendar, Target, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'

const ChatMessage = ({ message, isLoading }) => {
  const isAI = message.type === 'ai'

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    // You could add a toast notification here
  }

  const formatMessageContent = (content) => {
    // Simple markdown-like formatting for AI responses
    return content
      .split('\n')
      .map((line, index) => {
        // Handle headers
        if (line.startsWith('##')) {
          return (
            <h3 key={index} className="text-lg font-semibold mt-4 mb-2 text-foreground">
              {line.replace('##', '').trim()}
            </h3>
          )
        }
        
        // Handle bullet points
        if (line.startsWith('•') || line.startsWith('-')) {
          return (
            <li key={index} className="ml-4 mb-1 text-muted-foreground">
              {line.replace(/^[•-]\s*/, '')}
            </li>
          )
        }
        
        // Handle numbered lists
        if (line.match(/^\d+\./)) {
          return (
            <li key={index} className="ml-4 mb-1 text-muted-foreground list-decimal">
              {line.replace(/^\d+\.\s*/, '')}
            </li>
          )
        }
        
        // Handle bold text
        if (line.includes('**')) {
          const parts = line.split('**')
          return (
            <p key={index} className="mb-2">
              {parts.map((part, i) => 
                i % 2 === 1 ? <strong key={i}>{part}</strong> : part
              )}
            </p>
          )
        }
        
        // Regular paragraph
        if (line.trim()) {
          return (
            <p key={index} className="mb-2 text-muted-foreground">
              {line}
            </p>
          )
        }
        
        return <br key={index} />
      })
  }

  return (
    <div className={`flex gap-4 group ${isAI ? 'justify-start' : 'justify-end'}`}>
      {/* AI Avatar */}
      {isAI && (
        <div className="flex-shrink-0">
          <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
            <Bot className="h-5 w-5 text-blue-600" />
          </div>
        </div>
      )}

      {/* Message Content */}
      <div className={`max-w-[80%] ${isAI ? 'mr-auto' : 'ml-auto'}`}>
        <div
          className={`rounded-2xl p-4 ${
            isAI
              ? 'bg-gray-800 text-white'
              : 'bg-blue-600 text-white ml-auto'
          }`}
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
              <span className="text-sm text-gray-400">AI is thinking...</span>
            </div>
          ) : (
            <div className="prose prose-sm max-w-none">
              {isAI ? formatMessageContent(message.content) : (
                <p className="mb-0">{message.content}</p>
              )}
            </div>
          )}
        </div>

        {/* Message Actions (for AI messages only) */}
        {isAI && !isLoading && (
          <div className="flex items-center gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => copyToClipboard(message.content)}
              className="h-8 px-2"
            >
              <Copy className="h-3 w-3" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2"
            >
              <ThumbsUp className="h-3 w-3" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2"
            >
              <ThumbsDown className="h-3 w-3" />
            </Button>
          </div>
        )}

        {/* Timestamp */}
        <div className={`text-xs text-gray-500 mt-1 ${isAI ? 'text-left' : 'text-right'}`}>
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>

      {/* User Avatar */}
      {!isAI && (
        <div className="flex-shrink-0">
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
            <User className="h-5 w-5 text-white" />
          </div>
        </div>
      )}
    </div>
  )
}

export default ChatMessage