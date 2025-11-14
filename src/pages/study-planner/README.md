# AI Study Planner

A ChatGPT-like interface for intelligent study planning and academic assistance, built with React and designed for student success.

## 🚀 Features

- **ChatGPT-Style Interface**: Familiar chat experience for natural interaction
- **AI-Powered Responses**: Intelligent study advice and plan generation
- **Study Plan Management**: Save, edit, and track multiple study plans
- **Quick Actions**: Pre-built prompts for common study needs
- **Progress Tracking**: Monitor your learning journey and achievements
- **Responsive Design**: Works seamlessly on all devices
- **Customizable**: Easy to modify content, responses, and styling

## 📁 File Structure

```
src/pages/study-planner/
├── StudyPlannerPage.jsx          # Main chat interface
├── components/
│   ├── ChatMessage.jsx           # Individual message components
│   ├── StudyPlanSidebar.jsx      # Plans and templates sidebar
│   └── QuickActions.jsx          # Welcome page with action cards
└── data/
    └── plannerData.js            # Sample data and AI responses
```

## 🎨 Interface Components

### 1. **Chat Interface**
- **Message Display**: AI and user messages with timestamps
- **Typing Indicator**: Shows when AI is "thinking"
- **Message Actions**: Copy, like/dislike for AI responses
- **Input Area**: Multi-line textarea with send button

### 2. **Sidebar**
- **Study Plans**: List of saved/active study plans
- **Quick Templates**: Pre-built study plan templates
- **Plan Status**: Active, completed, or draft indicators
- **Progress Tracking**: Visual progress bars

### 3. **Quick Actions**
- **Action Cards**: Visual prompts for common tasks
- **Study Tips**: Educational content and techniques
- **Sample Prompts**: Pre-written questions to get started

## 🤖 AI Response System

The AI responses are template-based and keyword-triggered:

### Response Categories:
- **Study Plan Creation**: Comprehensive planning assistance
- **Time Management**: Productivity techniques and schedules
- **Goal Setting**: SMART goals and milestone planning
- **Progress Tracking**: Methods to monitor improvement
- **Exam Preparation**: Test-taking strategies and schedules
- **Motivation**: Encouragement and habit-building tips

## 🛠️ Customization Guide

### 1. **Modify AI Responses**

Edit `src/pages/study-planner/data/plannerData.js`:

```javascript
export const aiResponses = {
  createPlan: `Your custom response for study plan creation...`,
  timeManagement: `Your custom time management advice...`,
  // Add more response types
}
```

### 2. **Add New Quick Actions**

Update the QuickActions component:

```javascript
const quickActions = [
  {
    icon: YourIcon,
    title: 'Your Action Title',
    description: 'Action description',
    prompt: 'The prompt that will be sent to AI',
    color: 'bg-color-class'
  }
]
```

### 3. **Customize Study Plan Templates**

Add new templates in `plannerData.js`:

```javascript
export const studyTemplates = [
  {
    id: 'your-template',
    name: 'Template Name',
    description: 'Template description',
    duration: 'X weeks/months',
    phases: [
      { name: 'Phase 1', duration: 'time', description: 'what happens' }
    ]
  }
]
```

### 4. **Modify Interface Styling**

The interface uses Tailwind CSS classes that can be easily customized:

- **Color Scheme**: Update `bg-blue-600`, `text-blue-600` classes
- **Layout**: Modify flexbox and grid classes
- **Spacing**: Adjust padding and margin classes
- **Typography**: Change text size and weight classes

### 5. **Add New Response Triggers**

Extend the `generateAIResponse` function in `StudyPlannerPage.jsx`:

```javascript
const generateAIResponse = (userMessage) => {
  const lowerMessage = userMessage.toLowerCase()
  
  if (lowerMessage.includes('your-keyword')) {
    return aiResponses.yourNewResponseType
  }
  // ... existing conditions
}
```

## 📱 Responsive Design

The study planner is fully responsive:

- **Mobile**: Collapsible sidebar, touch-friendly interface
- **Tablet**: Adaptive layout with optimized spacing
- **Desktop**: Full sidebar with advanced features

## 🎯 Usage Examples

### Creating a Study Plan
**User**: "I need help creating a study schedule for my final exams"
**AI**: Provides comprehensive planning framework and asks clarifying questions

### Time Management Help
**User**: "I struggle with time management while studying"
**AI**: Offers Pomodoro technique, time blocking, and priority matrix strategies

### Goal Setting
**User**: "Help me set study goals for my upcoming semester"
**AI**: Guides through SMART goals framework with specific examples

## 🔧 Configuration Options

Edit `plannerConfig` in `plannerData.js`:

```javascript
export const plannerConfig = {
  interface: {
    title: "Your Study Planner Title",
    welcomeMessage: "Your custom welcome message",
  },
  features: {
    sidebarPlans: true,      // Enable/disable plan sidebar
    quickActions: true,      // Show quick action cards
    progressTracking: true,  // Enable progress features
    chatHistory: true,       // Save chat history
  },
  colors: {
    primary: "blue",         // Main theme color
    secondary: "purple",     // Secondary accent
  }
}
```

## 🚀 Getting Started

1. **Navigate to Study Planner**: Click "Study Planner" in the main navigation
2. **Start Chatting**: Use quick actions or type your own questions
3. **Explore Features**: Try different prompts and explore the sidebar
4. **Customize**: Modify the data files to match your needs

## 📊 Analytics Integration

To track user interactions, add event handlers:

```javascript
// In StudyPlannerPage.jsx
const handleSendMessage = async () => {
  // ... existing code
  
  // Analytics tracking
  gtag('event', 'study_planner_message', {
    message_type: 'user_input',
    message_length: inputMessage.length
  })
}
```

## 🔄 Future Enhancements

**Possible additions**:
- Real AI integration (OpenAI API, etc.)
- Voice input/output capabilities
- Study plan export (PDF, calendar)
- Integration with calendar apps
- Collaborative study planning
- Advanced progress analytics
- Habit tracking integration

## 🎨 Theming

The study planner supports both light and dark themes automatically. To customize themes:

1. **Update CSS variables** in your main CSS file
2. **Modify Tailwind color classes** throughout components
3. **Add theme toggle** if desired (currently uses system preference)

## 📝 Notes

- **AI Responses**: Currently template-based; can be enhanced with real AI APIs
- **Data Persistence**: Uses local state; add database integration for production
- **Performance**: Optimized for smooth chat experience with proper virtualization
- **Accessibility**: Includes proper ARIA labels and keyboard navigation

## 🤝 Contributing

To extend the study planner:

1. **Add new components** in the `components/` folder
2. **Extend AI responses** in `plannerData.js`
3. **Update routing** in main App.jsx if needed
4. **Test responsive design** across devices
5. **Update this README** with new features

The study planner is designed to be a comprehensive, ChatGPT-like interface that provides intelligent study assistance while remaining highly customizable and easy to extend.