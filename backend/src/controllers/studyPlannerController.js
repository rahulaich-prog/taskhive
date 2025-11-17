import { StudyPlan } from '../models/index.js';
import { validationResult } from 'express-validator';

// @desc    Get all study plans for user
// @route   GET /api/study-planner/plans
// @access  Private
export const getStudyPlans = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      status,
      template,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    const query = { user: req.user._id };
    
    if (status) {
      query.status = status;
    }
    if (template) {
      query.template = template;
    }

    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'asc' ? 1 : -1;

    const startIndex = (page - 1) * limit;
    const total = await StudyPlan.countDocuments(query);
    const totalPages = Math.ceil(total / limit);

    const plans = await StudyPlan.find(query)
      .sort(sortOptions)
      .limit(limit * 1)
      .skip(startIndex)
      .lean();

    const pagination = {
      current: Number(page),
      pages: totalPages,
      total,
      hasNext: page < totalPages,
      hasPrev: page > 1
    };

    res.json({
      success: true,
      data: {
        plans,
        pagination
      }
    });
  } catch (error) {
    console.error('Get study plans error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Get single study plan
// @route   GET /api/study-planner/plans/:id
// @access  Private
export const getStudyPlan = async (req, res) => {
  try {
    const { id } = req.params;

    const plan = await StudyPlan.findById(id).lean();

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: 'Study plan not found'
      });
    }

    // Check ownership or if plan is public
    if (plan.user.toString() !== req.user._id.toString() && !plan.isPublic) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this study plan'
      });
    }

    res.json({
      success: true,
      data: { plan }
    });
  } catch (error) {
    console.error('Get study plan error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Create new study plan
// @route   POST /api/study-planner/plans
// @access  Private
export const createStudyPlan = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const planData = {
      ...req.body,
      user: req.user._id
    };

    const plan = new StudyPlan(planData);
    await plan.save();

    res.status(201).json({
      success: true,
      message: 'Study plan created successfully',
      data: { plan }
    });
  } catch (error) {
    console.error('Create study plan error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Update study plan
// @route   PUT /api/study-planner/plans/:id
// @access  Private
export const updateStudyPlan = async (req, res) => {
  try {
    const { id } = req.params;

    const plan = await StudyPlan.findById(id);
    if (!plan) {
      return res.status(404).json({
        success: false,
        message: 'Study plan not found'
      });
    }

    // Check ownership
    if (plan.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this study plan'
      });
    }

    const updatedPlan = await StudyPlan.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      message: 'Study plan updated successfully',
      data: { plan: updatedPlan }
    });
  } catch (error) {
    console.error('Update study plan error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Delete study plan
// @route   DELETE /api/study-planner/plans/:id
// @access  Private
export const deleteStudyPlan = async (req, res) => {
  try {
    const { id } = req.params;

    const plan = await StudyPlan.findById(id);
    if (!plan) {
      return res.status(404).json({
        success: false,
        message: 'Study plan not found'
      });
    }

    // Check ownership
    if (plan.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this study plan'
      });
    }

    await StudyPlan.findByIdAndDelete(id);

    res.json({
      success: true,
      message: 'Study plan deleted successfully'
    });
  } catch (error) {
    console.error('Delete study plan error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Add AI interaction to study plan
// @route   POST /api/study-planner/plans/:id/ai-interaction
// @access  Private
export const addAIInteraction = async (req, res) => {
  try {
    const { id } = req.params;
    const { userMessage, aiResponse, context, suggestions } = req.body;

    const plan = await StudyPlan.findById(id);
    if (!plan) {
      return res.status(404).json({
        success: false,
        message: 'Study plan not found'
      });
    }

    // Check ownership
    if (plan.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this study plan'
      });
    }

    plan.aiInteractions.push({
      userMessage,
      aiResponse,
      context,
      suggestions,
      timestamp: new Date()
    });

    await plan.save();

    res.json({
      success: true,
      message: 'AI interaction added successfully',
      data: { 
        interaction: plan.aiInteractions[plan.aiInteractions.length - 1]
      }
    });
  } catch (error) {
    console.error('Add AI interaction error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Get AI chat history for study plan
// @route   GET /api/study-planner/plans/:id/chat-history
// @access  Private
export const getChatHistory = async (req, res) => {
  try {
    const { id } = req.params;
    const { page = 1, limit = 20 } = req.query;

    const plan = await StudyPlan.findById(id);
    if (!plan) {
      return res.status(404).json({
        success: false,
        message: 'Study plan not found'
      });
    }

    // Check ownership
    if (plan.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this study plan'
      });
    }

    // Get paginated chat history
    const startIndex = (page - 1) * limit;
    const interactions = plan.aiInteractions
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(startIndex, startIndex + Number(limit));

    const total = plan.aiInteractions.length;
    const totalPages = Math.ceil(total / limit);

    const pagination = {
      current: Number(page),
      pages: totalPages,
      total,
      hasNext: page < totalPages,
      hasPrev: page > 1
    };

    res.json({
      success: true,
      data: {
        interactions,
        pagination
      }
    });
  } catch (error) {
    console.error('Get chat history error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Add study session and update progress
// @route   POST /api/study-planner/plans/:id/study-session
// @access  Private
export const addStudySession = async (req, res) => {
  try {
    const { id } = req.params;
    const { subject, hours, notes } = req.body;

    if (!subject || !hours || hours <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Subject and positive hours are required'
      });
    }

    const plan = await StudyPlan.findById(id);
    if (!plan) {
      return res.status(404).json({
        success: false,
        message: 'Study plan not found'
      });
    }

    // Check ownership
    if (plan.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this study plan'
      });
    }

    // Use the model's method to add study session
    await plan.addStudySession(subject, hours);

    res.json({
      success: true,
      message: 'Study session recorded successfully',
      data: {
        progress: plan.progress,
        totalHoursStudied: plan.progress.totalHoursStudied,
        streak: plan.progress.streak
      }
    });
  } catch (error) {
    console.error('Add study session error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Update task status
// @route   PUT /api/study-planner/plans/:id/tasks/:taskId
// @access  Private
export const updateTaskStatus = async (req, res) => {
  try {
    const { id, taskId } = req.params;
    const { status, actualHours, notes } = req.body;

    const plan = await StudyPlan.findById(id);
    if (!plan) {
      return res.status(404).json({
        success: false,
        message: 'Study plan not found'
      });
    }

    // Check ownership
    if (plan.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this study plan'
      });
    }

    const task = plan.tasks.id(taskId);
    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    task.status = status;
    if (actualHours) task.actualHours = actualHours;
    if (notes) task.notes = notes;
    
    if (status === 'completed') {
      task.completedAt = new Date();
    }

    await plan.save();

    res.json({
      success: true,
      message: 'Task updated successfully',
      data: { task }
    });
  } catch (error) {
    console.error('Update task status error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Get study plan templates
// @route   GET /api/study-planner/templates
// @access  Public
export const getStudyPlanTemplates = async (req, res) => {
  try {
    // In a real application, these might come from the database
    const templates = [
      {
        id: 'exam-prep-30',
        name: 'Exam Preparation (30 Days)',
        description: 'Intensive 30-day exam preparation plan with structured phases',
        duration: { value: 30, unit: 'days' },
        template: 'exam-prep',
        phases: [
          { name: 'Assessment', duration: '3 days', description: 'Evaluate current knowledge and identify gaps' },
          { name: 'Foundation', duration: '10 days', description: 'Build strong conceptual understanding' },
          { name: 'Practice', duration: '12 days', description: 'Intensive problem-solving and practice tests' },
          { name: 'Review', duration: '5 days', description: 'Final review and last-minute preparations' }
        ]
      },
      {
        id: 'semester-plan',
        name: 'Semester Study Plan',
        description: 'Comprehensive plan for an entire academic semester',
        duration: { value: 4, unit: 'months' },
        template: 'semester-plan',
        phases: [
          { name: 'Course Setup', duration: '1 week', description: 'Organize materials and create initial schedule' },
          { name: 'Regular Study', duration: '12 weeks', description: 'Consistent daily study routine' },
          { name: 'Mid-term Prep', duration: '2 weeks', description: 'Intensive mid-term preparation' },
          { name: 'Final Prep', duration: '3 weeks', description: 'Comprehensive final exam preparation' }
        ]
      },
      {
        id: 'skill-building',
        name: 'Skill Building Program',
        description: 'Focused plan for developing specific skills or competencies',
        duration: { value: 8, unit: 'weeks' },
        template: 'skill-building',
        phases: [
          { name: 'Fundamentals', duration: '2 weeks', description: 'Learn basic concepts and principles' },
          { name: 'Application', duration: '4 weeks', description: 'Apply skills through projects and exercises' },
          { name: 'Mastery', duration: '2 weeks', description: 'Refine skills and work on advanced topics' }
        ]
      }
    ];

    res.json({
      success: true,
      data: { templates }
    });
  } catch (error) {
    console.error('Get study plan templates error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Get study statistics for user
// @route   GET /api/study-planner/stats
// @access  Private
export const getStudyStats = async (req, res) => {
  try {
    const userId = req.user._id;

    const [
      totalPlans,
      activePlans,
      completedPlans,
      totalHoursStudied,
      longestStreak
    ] = await Promise.all([
      StudyPlan.countDocuments({ user: userId }),
      StudyPlan.countDocuments({ user: userId, status: 'active' }),
      StudyPlan.countDocuments({ user: userId, status: 'completed' }),
      StudyPlan.aggregate([
        { $match: { user: userId } },
        { $group: { _id: null, totalHours: { $sum: '$progress.totalHoursStudied' } } }
      ]),
      StudyPlan.aggregate([
        { $match: { user: userId } },
        { $group: { _id: null, maxStreak: { $max: '$progress.streak.longest' } } }
      ])
    ]);

    // Get current week's study hours
    const startOfWeek = new Date();
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
    startOfWeek.setHours(0, 0, 0, 0);

    const weeklyHours = await StudyPlan.aggregate([
      { $match: { user: userId } },
      { $unwind: '$aiInteractions' },
      {
        $match: {
          'aiInteractions.timestamp': { $gte: startOfWeek }
        }
      },
      {
        $group: {
          _id: null,
          weeklyHours: { $sum: 1 } // This is simplified - you'd track actual study hours
        }
      }
    ]);

    const stats = {
      totalPlans,
      activePlans,
      completedPlans,
      totalHoursStudied: totalHoursStudied[0]?.totalHours || 0,
      longestStreak: longestStreak[0]?.maxStreak || 0,
      weeklyHours: weeklyHours[0]?.weeklyHours || 0,
      averageSessionLength: 90 // This could be calculated from actual sessions
    };

    res.json({
      success: true,
      data: { stats }
    });
  } catch (error) {
    console.error('Get study stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};