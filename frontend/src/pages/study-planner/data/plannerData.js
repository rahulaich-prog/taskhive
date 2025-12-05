// Sample study plans data
export const samplePlans = [
  {
    id: 1,
    title: "Final Semester Exams - Computer Science",
    duration: "6 weeks",
    subjects: ["Data Structures", "Algorithms", "Database Management", "Operating Systems"],
    status: "active",
    progress: 65,
    createdAt: new Date('2024-10-15'),
    deadline: new Date('2024-12-15')
  },
  {
    id: 2,
    title: "GATE 2024 Preparation",
    duration: "4 months",
    subjects: ["Mathematics", "Programming", "Computer Networks", "Theory of Computation"],
    status: "active",
    progress: 40,
    createdAt: new Date('2024-09-01'),
    deadline: new Date('2025-02-01')
  },
  {
    id: 3,
    title: "Mid-term Mathematics Prep",
    duration: "2 weeks",
    subjects: ["Calculus", "Linear Algebra", "Statistics"],
    status: "completed",
    progress: 100,
    createdAt: new Date('2024-09-20'),
    deadline: new Date('2024-10-05')
  },
  {
    id: 4,
    title: "Programming Assignment - Web Dev",
    duration: "1 week",
    subjects: ["React", "Node.js", "Database Design"],
    status: "draft",
    progress: 15,
    createdAt: new Date('2024-11-01'),
    deadline: new Date('2024-11-08')
  }
]

// Quick prompt suggestions
export const quickPrompts = [
  "Create a study schedule for my upcoming exams",
  "Help me set realistic study goals",
  "I need time management strategies",
  "What are the best study techniques for retention?",
  "How can I track my study progress effectively?",
  "Create an exam preparation plan"
]

// AI Response Templates
export const aiResponses = {
  createPlan: `I'd be happy to help you create a personalized study plan! Here's how we can structure it:

## 📅 Study Plan Framework

**First, I need some information:**
• What subjects/topics do you need to cover?
• How much time do you have available (daily/weekly)?
• What's your target deadline or exam date?
• What's your current knowledge level in each subject?

## 🎯 Recommended Study Plan Structure

**Week-by-Week Breakdown:**
1. **Assessment Phase** - Identify strengths and weaknesses
2. **Foundation Building** - Cover basic concepts
3. **Deep Dive** - Focus on challenging topics
4. **Practice & Application** - Solve problems and exercises
5. **Review & Revision** - Consolidate knowledge
6. **Final Preparation** - Mock tests and last-minute review

**Daily Schedule Template:**
• Morning (2 hours): High-focus subjects
• Afternoon (1.5 hours): Practice and exercises
• Evening (1 hour): Review and light topics

Would you like me to create a specific plan based on your subjects and timeline?`,

  timeManagement: `Great question! Effective time management is crucial for successful studying. Here are proven strategies:

## ⏰ Time Management Techniques

**1. Pomodoro Technique**
• Study for 25 minutes, then take a 5-minute break
• After 4 cycles, take a longer 15-30 minute break
• Helps maintain focus and prevents burnout

**2. Time Blocking**
• Assign specific time slots to different subjects
• Include buffer time for unexpected delays
• Use calendar apps to track your schedule

**3. Priority Matrix (Eisenhower Method)**
• Urgent + Important: Do first (exams, deadlines)
• Important + Not Urgent: Schedule (skill building)
• Urgent + Not Important: Delegate or minimize
• Neither: Eliminate

**4. The 80/20 Rule**
• Focus 80% of your time on the 20% of topics that matter most
• Identify high-impact areas for each subject

Would you like me to help you create a specific time-blocked schedule for your subjects?`,

  goalSetting: `Setting effective study goals is essential for success! Let's use the SMART framework:

## 🎯 SMART Goals Framework

**Specific:** Clearly define what you want to achieve
- Instead of "study math better" → "master calculus derivatives and integrals"

**Measurable:** Include quantifiable metrics
- "Complete 50 practice problems per week"
- "Achieve 85%+ on practice tests"

**Achievable:** Set realistic expectations
- Consider your current level and available time
- Break large goals into smaller milestones

**Relevant:** Align with your overall objectives
- Focus on exam-relevant topics
- Prioritize subjects based on importance

**Time-bound:** Set clear deadlines
- Daily, weekly, and monthly targets
- Include milestone check-ins

## 📋 Goal Categories

**Knowledge Goals:**
• Understand key concepts in each chapter
• Memorize important formulas/facts
• Connect related topics across subjects

**Skill Goals:**
• Improve problem-solving speed
• Develop better note-taking methods
• Enhance test-taking strategies

**Performance Goals:**
• Target scores for practice tests
• Completion rates for assignments
• Time management improvements

What specific goals would you like to set for your studies?`,

  progressTracking: `Tracking your progress is key to staying motivated and identifying areas for improvement! Here's a comprehensive approach:

## 📊 Progress Tracking Methods

**1. Daily Study Log**
• Record subjects studied and time spent
• Note difficulty level and comprehension
• Track mood and energy levels

**2. Weekly Assessment**
• Self-test on covered topics
• Identify areas needing more attention
• Review and adjust your study plan

**3. Progress Metrics**
• **Completion Rate:** % of planned topics covered
• **Comprehension Score:** Self-rate understanding 1-10
• **Practice Performance:** Scores on exercises/tests
• **Time Efficiency:** Actual vs. planned study time

**4. Visual Progress Tools**
• Study calendar with color-coded subjects
• Progress bars for each topic/subject
• Charts showing improvement over time
• Habit tracking for consistency

## 📱 Recommended Tracking Tools

**Digital Options:**
• Notion or Obsidian for comprehensive tracking
• Google Sheets for data analysis
• Study apps like Forest or Be Focused
• Calendar apps for time blocking

**Analog Options:**
• Bullet journal with habit trackers
• Wall calendar with progress stickers
• Subject-specific notebooks with checklists

## 🎯 Key Progress Indicators

• **Consistency:** Study days vs. planned days
• **Quality:** Understanding depth and retention
• **Speed:** Time to complete similar tasks
• **Confidence:** Self-assessment of readiness

Would you like me to help you set up a specific tracking system for your studies?`,

  examPrep: `Excellent! Let's create a comprehensive exam preparation strategy that maximizes your chances of success:

## 🎯 Exam Preparation Blueprint

**Phase 1: Assessment & Planning (Week 1)**
• List all exam topics and weightage
• Take a diagnostic test to identify weak areas
• Create a detailed study timeline
• Gather all necessary materials and resources

**Phase 2: Active Learning (Weeks 2-4)**
• **Concept Mastery:** Understand fundamentals thoroughly
• **Active Recall:** Test yourself regularly without notes
• **Spaced Repetition:** Review topics at increasing intervals
• **Problem Solving:** Practice with varied question types

**Phase 3: Intensive Practice (Week 5)**
• Take full-length mock exams
• Time yourself to improve speed
• Analyze mistakes and review weak topics
• Focus on high-yield, frequently tested concepts

**Phase 4: Final Review (Week 6)**
• Quick review of all topics
• Memorize key formulas and facts
• Light practice to maintain sharpness
• Prepare mentally and physically for exam day

## 📚 Daily Study Schedule Template

**Morning (3 hours):**
• New concept learning
• Difficult/challenging topics

**Afternoon (2 hours):**
• Practice problems
• Active recall sessions

**Evening (1 hour):**
• Review and light revision
• Prepare for next day

## 🧠 Proven Study Techniques

• **Feynman Technique:** Explain concepts in simple terms
• **Mind Mapping:** Visual representation of topics
• **Practice Testing:** Simulate exam conditions
• **Interleaving:** Mix different types of problems

What specific subjects are you preparing for, and how much time do you have?`,

  motivation: `I understand that staying motivated can be challenging! Here are strategies to keep you engaged and productive:

## 💪 Motivation Strategies

**1. Set Clear 'Why' Statements**
• Connect studies to your long-term goals
• Visualize your success and future opportunities
• Remember the consequences of not studying

**2. Create Momentum**
• Start with easy tasks to build confidence
• Use the "2-minute rule" - commit to just 2 minutes
• Celebrate small wins and progress

**3. Environmental Design**
• Create a dedicated, distraction-free study space
• Remove phones and other temptations
• Use tools like website blockers during study time

**4. Social Accountability**
• Study with friends or join study groups
• Share your goals with family/friends
• Use apps with social features for accountability

**5. Reward Systems**
• Plan small rewards after study sessions
• Bigger rewards for weekly/monthly milestones
• Balance work with activities you enjoy

## 🔥 Beat Common Challenges

**Procrastination:**
• Break tasks into tiny, manageable chunks
• Use the Pomodoro Technique
• Address underlying fears or perfectionism

**Overwhelm:**
• Focus on one task at a time
• Prioritize using the Eisenhower Matrix
• Remember: progress > perfection

**Burnout:**
• Schedule regular breaks and downtime
• Maintain physical exercise and good sleep
• Practice mindfulness or meditation

## 🎯 Daily Motivation Habits

• Start each day by reviewing your goals
• Track progress visually (calendars, charts)
• End each study session by noting achievements
• Reflect on how far you've come

Remember: Motivation gets you started, but habits keep you going! What specific challenges are you facing with motivation?`,

  general: `I'm here to help with all aspects of your study planning and academic success! Here are some areas I can assist with:

## 🎓 What I Can Help With

**Study Planning:**
• Create personalized study schedules
• Set realistic goals and milestones
• Design exam preparation strategies
• Balance multiple subjects effectively

**Learning Optimization:**
• Suggest effective study techniques
• Improve memory and retention
• Enhance focus and concentration
• Develop better note-taking methods

**Time Management:**
• Create efficient daily routines
• Use productivity techniques
• Eliminate distractions and procrastination
• Balance studies with other activities

**Progress Tracking:**
• Monitor your improvement over time
• Identify strengths and weaknesses
• Adjust plans based on performance
• Maintain motivation and consistency

## 💡 Popular Questions I Can Answer

• "How do I create a study schedule for [X] subjects?"
• "What's the best way to memorize [specific content]?"
• "How can I improve my focus while studying?"
• "Help me prepare for [specific exam type]"
• "I'm feeling overwhelmed, how do I manage everything?"
• "What study techniques work best for [subject]?"

## 🚀 Getting Started

To give you the most helpful advice, it's useful to know:
• Your current academic situation
• Specific subjects or exams you're preparing for
• How much time you have available
• Your biggest challenges or concerns

What would you like to work on today? Feel free to ask me anything about studying, planning, or academic success!`
}

// Study plan templates
export const studyTemplates = [
  {
    id: 'exam-prep-30',
    name: 'Exam Preparation (30 Days)',
    description: 'Intensive 30-day exam preparation plan',
    duration: '30 days',
    phases: [
      { name: 'Assessment', duration: '3 days', description: 'Evaluate current knowledge and identify gaps' },
      { name: 'Foundation', duration: '10 days', description: 'Build strong conceptual understanding' },
      { name: 'Practice', duration: '12 days', description: 'Intensive problem solving and application' },
      { name: 'Review', duration: '5 days', description: 'Final revision and mock tests' }
    ]
  },
  {
    id: 'semester-planning',
    name: 'Semester Study Plan',
    description: 'Comprehensive semester-long study strategy',
    duration: '16 weeks',
    phases: [
      { name: 'Course Overview', duration: '1 week', description: 'Understand syllabus and requirements' },
      { name: 'Regular Study', duration: '12 weeks', description: 'Consistent weekly study routine' },
      { name: 'Mid-term Prep', duration: '1 week', description: 'Mid-semester exam preparation' },
      { name: 'Final Prep', duration: '2 weeks', description: 'Final exam preparation and review' }
    ]
  },
  {
    id: 'assignment-tracker',
    name: 'Assignment Management',
    description: 'Track and manage multiple assignments',
    duration: 'Flexible',
    phases: [
      { name: 'Planning', duration: 'Ongoing', description: 'Break down assignments into manageable tasks' },
      { name: 'Research', duration: 'Varies', description: 'Gather information and resources' },
      { name: 'Execution', duration: 'Varies', description: 'Complete assignments systematically' },
      { name: 'Review', duration: 'Before submission', description: 'Edit, proofread, and finalize' }
    ]
  }
]

// Configuration for easy customization
export const plannerConfig = {
  // Interface settings
  interface: {
    title: "AI Study Planner",
    subtitle: "Your intelligent study companion",
    welcomeMessage: "Hello! I'm your AI Study Planner assistant. How can I help you today?",
    placeholderText: "Ask me about creating study plans, setting goals, time management...",
  },
  
  // Features to enable/disable
  features: {
    sidebarPlans: true,
    quickActions: true,
    progressTracking: true,
    chatHistory: true,
    exportPlans: false,
    voiceInput: false,
  },
  
  // Styling options
  colors: {
    primary: "blue",
    secondary: "purple", 
    accent: "green",
    warning: "yellow",
    danger: "red"
  }
}