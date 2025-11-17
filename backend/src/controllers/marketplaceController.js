import { Service, User, Category, Review } from '../models/index.js';
import { validationResult } from 'express-validator';

// @desc    Get all services with filtering and pagination
// @route   GET /api/marketplace/services
// @access  Public
export const getServices = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 12,
      category,
      subcategory,
      minPrice,
      maxPrice,
      rating,
      deliveryTime,
      search,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      featured
    } = req.query;

    // Build query
    const query = { status: 'active' };

    // Category filter
    if (category && category !== 'All Categories') {
      query.category = category;
    }
    if (subcategory) {
      query.subcategory = subcategory;
    }

    // Price filter
    if (minPrice || maxPrice) {
      query['pricing.basePrice'] = {};
      if (minPrice) query['pricing.basePrice'].$gte = Number(minPrice);
      if (maxPrice) query['pricing.basePrice'].$lte = Number(maxPrice);
    }

    // Rating filter
    if (rating) {
      query['rating.average'] = { $gte: Number(rating) };
    }

    // Delivery time filter
    if (deliveryTime) {
      query.deliveryTime = { $lte: Number(deliveryTime) };
    }

    // Featured filter
    if (featured === 'true') {
      query.isFeatured = true;
    }

    // Search functionality
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } },
        { searchKeywords: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    // Sort options
    const sortOptions = {};
    switch (sortBy) {
      case 'price-low':
        sortOptions['pricing.basePrice'] = 1;
        break;
      case 'price-high':
        sortOptions['pricing.basePrice'] = -1;
        break;
      case 'rating':
        sortOptions['rating.average'] = -1;
        break;
      case 'popular':
        sortOptions.orders = -1;
        break;
      case 'newest':
        sortOptions.createdAt = -1;
        break;
      default:
        sortOptions[sortBy] = sortOrder === 'asc' ? 1 : -1;
    }

    // Calculate pagination
    const startIndex = (page - 1) * limit;
    const total = await Service.countDocuments(query);
    const totalPages = Math.ceil(total / limit);

    // Execute query
    const services = await Service.find(query)
      .populate('seller', 'firstName lastName avatar sellerProfile.rating sellerProfile.totalReviews sellerProfile.isVerified')
      .sort(sortOptions)
      .limit(limit * 1)
      .skip(startIndex)
      .lean();

    // Pagination info
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
        services,
        pagination
      }
    });
  } catch (error) {
    console.error('Get services error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Get single service by ID or slug
// @route   GET /api/marketplace/services/:id
// @access  Public
export const getService = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Try to find by ID first, then by slug
    let service = await Service.findById(id)
      .populate('seller', 'firstName lastName avatar bio sellerProfile institution course')
      .lean();

    if (!service) {
      service = await Service.findOne({ slug: id })
        .populate('seller', 'firstName lastName avatar bio sellerProfile institution course')
        .lean();
    }

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      });
    }

    // Increment view count
    await Service.findByIdAndUpdate(service._id, { $inc: { views: 1 } });

    // Get related services
    const relatedServices = await Service.find({
      _id: { $ne: service._id },
      category: service.category,
      status: 'active'
    })
      .populate('seller', 'firstName lastName avatar sellerProfile.rating sellerProfile.totalReviews')
      .limit(4)
      .lean();

    // Get reviews for this service
    const reviews = await Review.find({ service: service._id, isVisible: true })
      .populate('reviewer', 'firstName lastName avatar')
      .sort({ createdAt: -1 })
      .limit(10)
      .lean();

    res.json({
      success: true,
      data: {
        service,
        relatedServices,
        reviews
      }
    });
  } catch (error) {
    console.error('Get service error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Create new service
// @route   POST /api/marketplace/services
// @access  Private (Seller)
export const createService = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const serviceData = {
      ...req.body,
      seller: req.user._id
    };

    const service = new Service(serviceData);
    await service.save();

    await service.populate('seller', 'firstName lastName avatar sellerProfile.rating sellerProfile.totalReviews');

    res.status(201).json({
      success: true,
      message: 'Service created successfully',
      data: { service }
    });
  } catch (error) {
    console.error('Create service error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Update service
// @route   PUT /api/marketplace/services/:id
// @access  Private (Seller - own service only)
export const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    
    const service = await Service.findById(id);
    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      });
    }

    // Check ownership
    if (service.seller.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this service'
      });
    }

    const updatedService = await Service.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    ).populate('seller', 'firstName lastName avatar sellerProfile.rating sellerProfile.totalReviews');

    res.json({
      success: true,
      message: 'Service updated successfully',
      data: { service: updatedService }
    });
  } catch (error) {
    console.error('Update service error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Delete service
// @route   DELETE /api/marketplace/services/:id
// @access  Private (Seller - own service only)
export const deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    
    const service = await Service.findById(id);
    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      });
    }

    // Check ownership or admin role
    if (service.seller.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this service'
      });
    }

    await Service.findByIdAndDelete(id);

    res.json({
      success: true,
      message: 'Service deleted successfully'
    });
  } catch (error) {
    console.error('Delete service error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Get categories with service counts
// @route   GET /api/marketplace/categories
// @access  Public
export const getCategories = async (req, res) => {
  try {
    // Get all active categories
    const categories = await Category.find({ isActive: true })
      .sort({ sortOrder: 1, name: 1 });

    // Get service counts for each category
    const categoriesWithCounts = await Promise.all(
      categories.map(async (category) => {
        const serviceCount = await Service.countDocuments({
          category: category.name,
          status: 'active'
        });
        
        return {
          ...category.toJSON(),
          serviceCount
        };
      })
    );

    res.json({
      success: true,
      data: { categories: categoriesWithCounts }
    });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Get marketplace statistics
// @route   GET /api/marketplace/stats
// @access  Public
export const getMarketplaceStats = async (req, res) => {
  try {
    const [
      totalServices,
      totalSellers,
      totalStudents,
      avgRating
    ] = await Promise.all([
      Service.countDocuments({ status: 'active' }),
      User.countDocuments({ role: 'tutor', isActive: true }),
      User.countDocuments({ role: 'student', isActive: true }),
      Service.aggregate([
        { $match: { status: 'active', 'rating.count': { $gt: 0 } } },
        { $group: { _id: null, avgRating: { $avg: '$rating.average' } } }
      ])
    ]);

    const stats = {
      totalServices,
      totalSellers,
      totalStudents: totalStudents,
      averageRating: avgRating[0]?.avgRating || 0,
      successRate: 98 // This could be calculated based on completed orders
    };

    res.json({
      success: true,
      data: { stats }
    });
  } catch (error) {
    console.error('Get marketplace stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Search services
// @route   GET /api/marketplace/search
// @access  Public
export const searchServices = async (req, res) => {
  try {
    const { q, ...filters } = req.query;

    if (!q) {
      return res.status(400).json({
        success: false,
        message: 'Search query is required'
      });
    }

    // Use the existing getServices function with search parameter
    req.query = { ...filters, search: q };
    return getServices(req, res);
  } catch (error) {
    console.error('Search services error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Get featured services
// @route   GET /api/marketplace/featured
// @access  Public
export const getFeaturedServices = async (req, res) => {
  try {
    const { limit = 8 } = req.query;

    const services = await Service.find({
      status: 'active',
      isFeatured: true
    })
      .populate('seller', 'firstName lastName avatar sellerProfile.rating sellerProfile.totalReviews sellerProfile.isVerified')
      .sort({ 'rating.average': -1, orders: -1 })
      .limit(Number(limit))
      .lean();

    res.json({
      success: true,
      data: { services }
    });
  } catch (error) {
    console.error('Get featured services error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Get seller's services
// @route   GET /api/marketplace/my-services
// @access  Private (Seller)
export const getMyServices = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      status,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    const query = { seller: req.user._id };
    
    if (status) {
      query.status = status;
    }

    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'asc' ? 1 : -1;

    const startIndex = (page - 1) * limit;
    const total = await Service.countDocuments(query);
    const totalPages = Math.ceil(total / limit);

    const services = await Service.find(query)
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
        services,
        pagination
      }
    });
  } catch (error) {
    console.error('Get my services error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};