import mongoose from 'mongoose';

const studyPlanSchema = new mongoose.Schema({
  // Basic Information
  title: {
    type: String,
    required: [true, 'Study plan title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  description: {
    type: String,
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  
  // Owner Information
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  // Plan Details
  duration: {
    value: {
      type: Number,
      required: true,
      min: 1
    },
    unit: {
      type: String,
      enum: ['days', 'weeks', 'months'],
      required: true
    }
  },
  
  // Academic Information
  subjects: [{
    name: {
      type: String,
      required: true,
      trim: true
    },
    priority: {
      type: String,
      enum: ['high', 'medium', 'low'],
      default: 'medium'
    },
    targetGrade: String,
    currentLevel: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced']
    },
    timeAllocation: {
      type: Number, // percentage of total study time
      min: 0,
      max: 100
    }
  }],
  
  // Goals and Objectives
  goals: [{
    title: {
      type: String,
      required: true
    },
    description: String,
    targetDate: Date,
    priority: {
      type: String,
      enum: ['high', 'medium', 'low'],
      default: 'medium'
    },
    isCompleted: {
      type: Boolean,
      default: false
    },
    completedAt: Date
  }],
  
  // Schedule and Timeline
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  
  // Study Schedule
  weeklySchedule: [{
    day: {
      type: String,
      enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
      required: true
    },
    sessions: [{
      subject: String,
      startTime: String, // format: "HH:MM"
      endTime: String,   // format: "HH:MM"
      type: {
        type: String,
        enum: ['study', 'practice', 'review', 'break', 'exam'],
        default: 'study'
      },
      topics: [String],
      notes: String
    }]
  }],
  
  // Daily Tasks and Milestones
  tasks: [{
    title: {
      type: String,
      required: true
    },
    description: String,
    subject: String,
    dueDate: Date,
    estimatedHours: Number,
    priority: {
      type: String,
      enum: ['high', 'medium', 'low'],
      default: 'medium'
    },
    status: {
      type: String,
      enum: ['pending', 'in-progress', 'completed', 'overdue'],
      default: 'pending'
    },
    completedAt: Date,
    actualHours: Number
  }],
  
  // Progress Tracking
  progress: {
    overall: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    },
    subjects: [{
      name: String,
      progress: {
        type: Number,
        default: 0,
        min: 0,
        max: 100
      },
      hoursStudied: {
        type: Number,
        default: 0
      },
      lastStudied: Date
    }],
    totalHoursStudied: {
      type: Number,
      default: 0
    },
    totalHoursPlanned: {
      type: Number,
      default: 0
    },
    streak: {
      current: {
        type: Number,
        default: 0
      },
      longest: {
        type: Number,
        default: 0
      },
      lastStudyDate: Date
    }
  },
  
  // Study Preferences
  preferences: {
    studyMethod: {
      type: String,
      enum: ['visual', 'auditory', 'kinesthetic', 'reading-writing', 'mixed']
    },
    sessionDuration: {
      type: Number, // in minutes
      default: 90
    },
    breakDuration: {
      type: Number, // in minutes
      default: 15
    },
    preferredTimes: [{
      type: String,
      enum: ['early-morning', 'morning', 'afternoon', 'evening', 'night']
    }],
    studyEnvironment: {
      type: String,
      enum: ['library', 'home', 'coffee-shop', 'outdoors', 'online']
    },
    motivationTechniques: [String]
  },
  
  // Resources and Materials
  resources: [{
    title: {
      type: String,
      required: true
    },
    type: {
      type: String,
      enum: ['book', 'video', 'article', 'course', 'practice-test', 'notes', 'other']
    },
    url: String,
    subject: String,
    priority: {
      type: String,
      enum: ['high', 'medium', 'low'],
      default: 'medium'
    },
    isCompleted: {
      type: Boolean,
      default: false
    },
    notes: String
  }],
  
  // AI Interactions and Chat History
  aiInteractions: [{
    timestamp: {
      type: Date,
      default: Date.now
    },
    userMessage: String,
    aiResponse: String,
    context: String, // What the user was asking about
    suggestions: [String] // AI suggestions provided
  }],
  
  // Reminders and Notifications
  reminders: [{
    type: {
      type: String,
      enum: ['study-session', 'deadline', 'goal-check', 'break', 'review']
    },
    message: String,
    scheduledTime: Date,
    isActive: {
      type: Boolean,
      default: true
    },
    isRecurring: {
      type: Boolean,
      default: false
    },
    recurringPattern: String // e.g., "daily", "weekly", "monthly"
  }],
  
  // Plan Status and Metadata
  status: {
    type: String,
    enum: ['draft', 'active', 'paused', 'completed', 'archived'],
    default: 'draft'
  },
  template: {
    type: String,
    enum: ['exam-prep', 'semester-plan', 'skill-building', 'research-project', 'custom'],
    default: 'custom'
  },
  isPublic: {
    type: Boolean,
    default: false
  },
  tags: [{
    type: String,
    lowercase: true,
    trim: true
  }],
  
  // Collaboration (if shared with tutors or study groups)
  collaborators: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    role: {
      type: String,
      enum: ['viewer', 'editor', 'tutor'],
      default: 'viewer'
    },
    addedAt: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for total duration in days
studyPlanSchema.virtual('totalDays').get(function() {
  const multipliers = { days: 1, weeks: 7, months: 30 };
  return this.duration.value * multipliers[this.duration.unit];
});

// Virtual for remaining days
studyPlanSchema.virtual('remainingDays').get(function() {
  const now = new Date();
  const end = new Date(this.endDate);
  return Math.max(0, Math.ceil((end - now) / (1000 * 60 * 60 * 24)));
});

// Virtual for completion percentage
studyPlanSchema.virtual('completionPercentage').get(function() {
  if (this.tasks.length === 0) return 0;
  const completedTasks = this.tasks.filter(task => task.status === 'completed').length;
  return Math.round((completedTasks / this.tasks.length) * 100);
});

// Virtual for study efficiency
studyPlanSchema.virtual('studyEfficiency').get(function() {
  const { totalHoursStudied, totalHoursPlanned } = this.progress;
  if (totalHoursPlanned === 0) return 0;
  return Math.round((totalHoursStudied / totalHoursPlanned) * 100);
});

// Indexes for better query performance
studyPlanSchema.index({ user: 1, status: 1 });
studyPlanSchema.index({ startDate: 1, endDate: 1 });
studyPlanSchema.index({ 'subjects.name': 1 });
studyPlanSchema.index({ createdAt: -1 });
studyPlanSchema.index({ tags: 1 });
studyPlanSchema.index({ template: 1, isPublic: 1 });

// Pre-save middleware to calculate total planned hours
studyPlanSchema.pre('save', function(next) {
  // Calculate total planned hours from weekly schedule
  let totalHours = 0;
  const weeksInPlan = Math.ceil(this.totalDays / 7);
  
  this.weeklySchedule.forEach(day => {
    day.sessions.forEach(session => {
      if (session.startTime && session.endTime) {
        const start = new Date(`1970-01-01T${session.startTime}:00`);
        const end = new Date(`1970-01-01T${session.endTime}:00`);
        const duration = (end - start) / (1000 * 60 * 60); // hours
        if (duration > 0) {
          totalHours += duration;
        }
      }
    });
  });
  
  this.progress.totalHoursPlanned = totalHours * weeksInPlan;
  
  // Update overall progress based on completed tasks and goals
  const taskProgress = this.completionPercentage;
  const goalProgress = this.goals.length > 0 
    ? (this.goals.filter(goal => goal.isCompleted).length / this.goals.length) * 100 
    : 0;
  
  this.progress.overall = Math.round((taskProgress + goalProgress) / 2);
  
  next();
});

// Method to add study session and update progress
studyPlanSchema.methods.addStudySession = function(subject, hours) {
  this.progress.totalHoursStudied += hours;
  
  // Update subject-specific progress
  let subjectProgress = this.progress.subjects.find(s => s.name === subject);
  if (!subjectProgress) {
    subjectProgress = { name: subject, progress: 0, hoursStudied: 0 };
    this.progress.subjects.push(subjectProgress);
  }
  
  subjectProgress.hoursStudied += hours;
  subjectProgress.lastStudied = new Date();
  
  // Update study streak
  const today = new Date().toDateString();
  const lastStudy = this.progress.streak.lastStudyDate?.toDateString();
  
  if (lastStudy !== today) {
    if (lastStudy === new Date(Date.now() - 86400000).toDateString()) {
      // Consecutive day
      this.progress.streak.current += 1;
      this.progress.streak.longest = Math.max(
        this.progress.streak.longest,
        this.progress.streak.current
      );
    } else {
      // Not consecutive, reset streak
      this.progress.streak.current = 1;
    }
    this.progress.streak.lastStudyDate = new Date();
  }
  
  return this.save();
};

export default mongoose.model('StudyPlan', studyPlanSchema);