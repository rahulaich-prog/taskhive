import { User, Service, Order, StudyPlan, Review } from '../models/index.js';
import { validationResult } from 'express-validator';

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    res.json({
      success: true,
      data: { user: user.toJSON() }
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
export const updateProfile = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const allowedFields = [
      'firstName', 'lastName', 'bio', 'phone', 'location',
      'institution', 'course', 'year', 'subjects'
    ];

    const updates = {};
    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    const user = await User.findByIdAndUpdate(
      req.user._id,
      updates,
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: { user: user.toJSON() }
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Update seller profile
// @route   PUT /api/users/seller-profile
// @access  Private (Tutors only)
export const updateSellerProfile = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    if (req.user.role !== 'tutor') {
      return res.status(403).json({
        success: false,
        message: 'Only tutors can update seller profile'
      });
    }

    const allowedFields = ['skills', 'hourlyRate', 'availability'];
    const updates = {};
    
    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        updates[`sellerProfile.${field}`] = req.body[field];
      }
    });

    const user = await User.findByIdAndUpdate(
      req.user._id,
      updates,
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      message: 'Seller profile updated successfully',
      data: { sellerProfile: user.sellerProfile }
    });
  } catch (error) {
    console.error('Update seller profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Get user dashboard data
// @route   GET /api/users/dashboard
// @access  Private
export const getDashboard = async (req, res) => {
  try {
    const userId = req.user._id;
    const userRole = req.user.role;

    // Common stats for all users
    const [
      activeStudyPlans,
      totalStudyHours,
      recentActivity
    ] = await Promise.all([
      StudyPlan.countDocuments({ user: userId, status: 'active' }),
      StudyPlan.aggregate([
        { $match: { user: userId } },
        { $group: { _id: null, total: { $sum: '$progress.totalHoursStudied' } } }
      ]),
      StudyPlan.find({ user: userId })
        .sort({ updatedAt: -1 })
        .limit(5)
        .select('title status progress.overall updatedAt')
        .lean()
    ]);

    let dashboardData = {
      activeStudyPlans,
      totalStudyHours: totalStudyHours[0]?.total || 0,
      recentActivity
    };

    // Additional stats for tutors/sellers
    if (userRole === 'tutor') {
      const [
        activeServices,
        pendingOrders,
        totalEarnings,
        averageRating,
        recentOrders
      ] = await Promise.all([
        Service.countDocuments({ seller: userId, status: 'active' }),
        Order.countDocuments({ seller: userId, status: { $in: ['pending', 'in-progress'] } }),
        Order.aggregate([
          { $match: { seller: userId, status: 'completed' } },
          { $group: { _id: null, total: { $sum: '$pricing.total' } } }
        ]),
        Review.aggregate([
          { $match: { seller: userId } },
          { $group: { _id: null, avgRating: { $avg: '$rating.overall' } } }
        ]),
        Order.find({ seller: userId })
          .sort({ createdAt: -1 })
          .limit(5)
          .populate('buyer', 'firstName lastName')
          .populate('service', 'title')
          .select('orderNumber status pricing.total createdAt')
          .lean()
      ]);

      dashboardData.sellerStats = {
        activeServices,
        pendingOrders,
        totalEarnings: totalEarnings[0]?.total || 0,
        averageRating: averageRating[0]?.avgRating || 0,
        recentOrders
      };
    }

    // Additional stats for students/buyers
    if (userRole === 'student') {
      const [
        activeOrders,
        completedOrders,
        totalSpent,
        recentPurchases
      ] = await Promise.all([
        Order.countDocuments({ buyer: userId, status: { $in: ['accepted', 'in-progress', 'delivered'] } }),
        Order.countDocuments({ buyer: userId, status: 'completed' }),
        Order.aggregate([
          { $match: { buyer: userId, 'payment.status': 'paid' } },
          { $group: { _id: null, total: { $sum: '$pricing.total' } } }
        ]),
        Order.find({ buyer: userId })
          .sort({ createdAt: -1 })
          .limit(5)
          .populate('seller', 'firstName lastName')
          .populate('service', 'title')
          .select('orderNumber status pricing.total createdAt')
          .lean()
      ]);

      dashboardData.buyerStats = {
        activeOrders,
        completedOrders,
        totalSpent: totalSpent[0]?.total || 0,
        recentPurchases
      };
    }

    res.json({
      success: true,
      data: dashboardData
    });
  } catch (error) {
    console.error('Get dashboard error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Get user orders (as buyer or seller)
// @route   GET /api/users/orders
// @access  Private
export const getUserOrders = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      status,
      role = 'buyer', // 'buyer' or 'seller'
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    const userId = req.user._id;
    
    // Build query based on role
    const query = {};
    if (role === 'buyer') {
      query.buyer = userId;
    } else if (role === 'seller') {
      query.seller = userId;
    } else {
      // Both buyer and seller orders
      query.$or = [{ buyer: userId }, { seller: userId }];
    }

    if (status) {
      query.status = status;
    }

    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'asc' ? 1 : -1;

    const startIndex = (page - 1) * limit;
    const total = await Order.countDocuments(query);
    const totalPages = Math.ceil(total / limit);

    const orders = await Order.find(query)
      .populate('buyer', 'firstName lastName avatar')
      .populate('seller', 'firstName lastName avatar')
      .populate('service', 'title images')
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
        orders,
        pagination
      }
    });
  } catch (error) {
    console.error('Get user orders error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Get user reviews (given and received)
// @route   GET /api/users/reviews
// @access  Private
export const getUserReviews = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      type = 'received' // 'given' or 'received'
    } = req.query;

    const userId = req.user._id;
    
    const query = {};
    if (type === 'given') {
      query.reviewer = userId;
    } else {
      query.seller = userId;
    }

    const startIndex = (page - 1) * limit;
    const total = await Review.countDocuments(query);
    const totalPages = Math.ceil(total / limit);

    const reviews = await Review.find(query)
      .populate('reviewer', 'firstName lastName avatar')
      .populate('seller', 'firstName lastName avatar')
      .populate('service', 'title images')
      .populate('order', 'orderNumber')
      .sort({ createdAt: -1 })
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
        reviews,
        pagination
      }
    });
  } catch (error) {
    console.error('Get user reviews error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Get user notifications
// @route   GET /api/users/notifications
// @access  Private
export const getNotifications = async (req, res) => {
  try {
    const { page = 1, limit = 20, unreadOnly = false } = req.query;
    
    // This is a simplified implementation
    // In a real app, you'd have a separate Notification model
    const notifications = [
      {
        id: '1',
        type: 'order',
        title: 'New Order Received',
        message: 'You have received a new order for Math Tutoring',
        isRead: false,
        createdAt: new Date(),
        data: { orderId: '123' }
      },
      {
        id: '2',
        type: 'study_plan',
        title: 'Study Goal Completed',
        message: 'Congratulations! You completed your calculus study goal',
        isRead: true,
        createdAt: new Date(Date.now() - 86400000),
        data: { planId: '456' }
      }
    ];

    const filteredNotifications = unreadOnly === 'true' 
      ? notifications.filter(n => !n.isRead)
      : notifications;

    res.json({
      success: true,
      data: {
        notifications: filteredNotifications,
        unreadCount: notifications.filter(n => !n.isRead).length
      }
    });
  } catch (error) {
    console.error('Get notifications error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Update user avatar
// @route   PUT /api/users/avatar
// @access  Private
export const updateAvatar = async (req, res) => {
  try {
    const { avatar } = req.body;

    if (!avatar) {
      return res.status(400).json({
        success: false,
        message: 'Avatar URL is required'
      });
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { avatar },
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      message: 'Avatar updated successfully',
      data: { avatar: user.avatar }
    });
  } catch (error) {
    console.error('Update avatar error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Get public user profile
// @route   GET /api/users/:id/public
// @access  Public
export const getPublicProfile = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id)
      .select('firstName lastName avatar bio institution course sellerProfile createdAt');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Get user's services if they're a tutor
    let services = [];
    if (user.sellerProfile && user.sellerProfile.isVerified) {
      services = await Service.find({
        seller: id,
        status: 'active'
      })
        .select('title description pricing.basePrice rating images deliveryTime')
        .limit(6)
        .lean();
    }

    // Get user's reviews as a seller
    const reviews = await Review.find({
      seller: id,
      isVisible: true
    })
      .populate('reviewer', 'firstName lastName avatar')
      .select('rating comment createdAt')
      .sort({ createdAt: -1 })
      .limit(5)
      .lean();

    res.json({
      success: true,
      data: {
        user: user.toJSON(),
        services,
        reviews
      }
    });
  } catch (error) {
    console.error('Get public profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};