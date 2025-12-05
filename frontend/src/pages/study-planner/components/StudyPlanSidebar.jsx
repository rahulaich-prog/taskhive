import React from 'react'
import { Calendar, BookOpen, Target, Clock, Plus, X, Trash2, Edit } from 'lucide-react'
import { Button } from '@/components/ui/button'

const StudyPlanSidebar = ({ 
  isOpen, 
  onClose, 
  plans, 
  currentPlan, 
  setCurrentPlan, 
  onClearChat 
}) => {
  const handlePlanSelect = (plan) => {
    setCurrentPlan(plan)
    // You could load the plan details into the chat here
  }

  return (
    <>
      {/* Sidebar */}
      <div className={`
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        fixed lg:static inset-y-0 left-0 z-50 w-80 bg-gray-900 border-r border-gray-700 transition-transform duration-300 ease-in-out flex flex-col
      `}>
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h2 className="text-lg font-semibold text-white">Study Plans</h2>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearChat}
              className="hidden lg:flex"
            >
              <Plus className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="lg:hidden"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="p-4 border-b border-gray-700">
          <Button 
            onClick={onClearChat}
            className="w-full justify-start bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Study Plan
          </Button>
        </div>

        {/* Study Plans List */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4">
            <h3 className="text-sm font-medium text-gray-400 mb-3">Recent Plans</h3>
            <div className="space-y-2">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  onClick={() => handlePlanSelect(plan)}
                  className={`
                    p-3 rounded-lg border border-gray-700 cursor-pointer transition-colors
                    ${currentPlan?.id === plan.id 
                      ? 'bg-blue-900/20 border-blue-700' 
                      : 'hover:bg-gray-800'
                    }
                  `}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-sm line-clamp-2 text-white">{plan.title}</h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="opacity-0 group-hover:opacity-100 h-6 w-6 p-0 text-gray-400 hover:text-white"
                    >
                      <Edit className="h-3 w-3" />
                    </Button>
                  </div>
                  
                  <div className="flex items-center gap-3 text-xs text-gray-400 mb-2">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{plan.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Target className="h-3 w-3" />
                      <span>{plan.subjects?.length || 0} subjects</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className={`px-2 py-1 rounded-full text-xs ${
                      plan.status === 'active' 
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                        : plan.status === 'completed'
                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'
                        : 'bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400'
                    }`}>
                      {plan.status}
                    </div>
                    <span className="text-xs text-gray-400">
                      {plan.progress}% complete
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Study Templates */}
          <div className="p-4 border-t border-gray-700">
            <h3 className="text-sm font-medium text-gray-400 mb-3">Quick Templates</h3>
            <div className="space-y-2">
              <Button
                variant="ghost"
                className="w-full justify-start text-left h-auto p-3 text-white hover:bg-gray-800"
                onClick={() => {/* Handle template selection */}}
              >
                <div>
                  <div className="font-medium text-sm">Exam Preparation</div>
                  <div className="text-xs text-gray-400">30-day intensive study plan</div>
                </div>
              </Button>
              
              <Button
                variant="ghost"
                className="w-full justify-start text-left h-auto p-3 text-white hover:bg-gray-800"
                onClick={() => {/* Handle template selection */}}
              >
                <div>
                  <div className="font-medium text-sm">Semester Planning</div>
                  <div className="text-xs text-gray-400">Full semester study schedule</div>
                </div>
              </Button>
              
              <Button
                variant="ghost"
                className="w-full justify-start text-left h-auto p-3 text-white hover:bg-gray-800"
                onClick={() => {/* Handle template selection */}}
              >
                <div>
                  <div className="font-medium text-sm">Assignment Tracker</div>
                  <div className="text-xs text-gray-400">Track multiple assignments</div>
                </div>
              </Button>
            </div>
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t">
          <div className="text-xs text-muted-foreground text-center">
            AI Study Planner v1.0
          </div>
        </div>
      </div>
    </>
  )
}

export default StudyPlanSidebar