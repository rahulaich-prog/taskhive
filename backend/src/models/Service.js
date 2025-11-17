import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  // Basic Information
  title: {
    type: String,
    required: [true, 'Service title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Service description is required'],
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  
  // Seller Information
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  // Category and Tags
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: [
      'Tutoring',
      'Assignment Help',
      'Study Resources',
      'Research Services',
      'Design & Creative',
      'Programming',
      'Writing & Translation',
      'Language Learning',
      'Test Preparation',
      'Other'
    ]
  },
  subcategory: {
    type: String,
    trim: true
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  
  // Pricing
  pricing: {
    type: {
      type: String,
      enum: ['fixed', 'hourly', 'package'],
      required: true
    },
    basePrice: {
      type: Number,
      required: [true, 'Base price is required'],
      min: [0, 'Price cannot be negative']
    },
    packages: [{
      name: {
        type: String,
        required: true
      },
      description: String,
      price: {
        type: Number,
        required: true,
        min: 0
      },
      deliveryTime: {
        type: Number, // in days
        required: true,
        min: 1
      },
      revisions: {
        type: Number,
        default: 0
      },
      features: [String]
    }]
  },
  
  // Service Details
  deliveryTime: {
    type: Number, // in days
    required: [true, 'Delivery time is required'],
    min: [1, 'Delivery time must be at least 1 day']
  },
  revisions: {
    type: Number,
    default: 0,
    min: 0
  },
  
  // Media
  images: [{
    url: {
      type: String,
      required: true
    },
    publicId: String, // for Cloudinary
    isPrimary: {
      type: Boolean,
      default: false
    }
  }],
  video: {
    url: String,
    publicId: String
  },
  
  // Service Requirements
  requirements: [{
    question: {
      type: String,
      required: true
    },
    type: {
      type: String,
      enum: ['text', 'file', 'multiple_choice'],
      default: 'text'
    },
    required: {
      type: Boolean,
      default: true
    },
    options: [String] // for multiple choice questions
  }],
  
  // FAQ
  faq: [{
    question: {
      type: String,
      required: true
    },
    answer: {
      type: String,
      required: true
    }
  }],
  
  // Statistics and Status
  views: {
    type: Number,
    default: 0
  },
  orders: {
    type: Number,
    default: 0
  },
  rating: {
    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    count: {
      type: Number,
      default: 0
    }
  },
  
  // Service Status
  status: {
    type: String,
    enum: ['draft', 'active', 'paused', 'inactive'],
    default: 'draft'
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  
  // Academic Level (for tutoring services)
  academicLevel: {
    type: String,
    enum: ['elementary', 'high-school', 'undergraduate', 'graduate', 'phd', 'all-levels']
  },
  
  // Subject Areas (for tutoring services)
  subjects: [{
    name: String,
    proficiencyLevel: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced', 'expert']
    }
  }],
  
  // Availability (for tutoring services)
  availability: {
    timezone: String,
    schedule: [{
      day: {
        type: String,
        enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
      },
      timeSlots: [{
        startTime: String, // format: "HH:MM"
        endTime: String    // format: "HH:MM"
      }]
    }]
  },
  
  // SEO and Search
  slug: {
    type: String,
    unique: true,
    lowercase: true
  },
  searchKeywords: [String]
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for display price
serviceSchema.virtual('displayPrice').get(function() {
  if (this.pricing.type === 'fixed') {
    return `₹${this.pricing.basePrice}`;
  } else if (this.pricing.type === 'hourly') {
    return `₹${this.pricing.basePrice}/hour`;
  } else {
    return `Starting at ₹${this.pricing.basePrice}`;
  }
});

// Virtual for primary image
serviceSchema.virtual('primaryImage').get(function() {
  const primary = this.images.find(img => img.isPrimary);
  return primary ? primary.url : this.images[0]?.url || '';
});

// Virtual for seller info (populated)
serviceSchema.virtual('sellerInfo', {
  ref: 'User',
  localField: 'seller',
  foreignField: '_id',
  justOne: true
});

// Indexes for better search performance
serviceSchema.index({ title: 'text', description: 'text', tags: 'text' });
serviceSchema.index({ category: 1, status: 1 });
serviceSchema.index({ seller: 1, status: 1 });
serviceSchema.index({ 'rating.average': -1 });
serviceSchema.index({ 'pricing.basePrice': 1 });
serviceSchema.index({ createdAt: -1 });
serviceSchema.index({ isFeatured: -1, status: 1 });
serviceSchema.index({ slug: 1 });

// Pre-save middleware to generate slug
serviceSchema.pre('save', function(next) {
  if (this.isModified('title') || this.isNew) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim('-');
    
    // Add random suffix to ensure uniqueness
    if (this.isNew) {
      this.slug += '-' + Date.now();
    }
  }
  next();
});

// Pre-save middleware to update search keywords
serviceSchema.pre('save', function(next) {
  // Generate search keywords from title, description, and tags
  const keywords = [
    ...this.title.toLowerCase().split(' '),
    ...this.description.toLowerCase().split(' '),
    ...this.tags,
    this.category.toLowerCase()
  ];
  
  // Remove duplicates and filter out common words
  const stopWords = ['the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by'];
  this.searchKeywords = [...new Set(keywords)]
    .filter(word => word.length > 2 && !stopWords.includes(word))
    .slice(0, 20); // Limit to 20 keywords
  
  next();
});

export default mongoose.model('Service', serviceSchema);