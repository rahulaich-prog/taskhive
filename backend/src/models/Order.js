import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  // Order Identification
  orderNumber: {
    type: String,
    unique: true,
    required: true
  },
  
  // Parties Involved
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service',
    required: true
  },
  
  // Package Details
  packageDetails: {
    name: String,
    description: String,
    price: {
      type: Number,
      required: true,
      min: 0
    },
    deliveryTime: Number, // in days
    revisions: Number,
    features: [String]
  },
  
  // Requirements and Instructions
  requirements: [{
    question: String,
    answer: String,
    type: {
      type: String,
      enum: ['text', 'file', 'multiple_choice']
    },
    files: [{
      filename: String,
      url: String,
      publicId: String,
      fileSize: Number
    }]
  }],
  
  // Additional Instructions
  instructions: {
    type: String,
    maxlength: [2000, 'Instructions cannot exceed 2000 characters']
  },
  
  // Pricing and Payment
  pricing: {
    subtotal: {
      type: Number,
      required: true,
      min: 0
    },
    serviceFee: {
      type: Number,
      default: 0,
      min: 0
    },
    tax: {
      type: Number,
      default: 0,
      min: 0
    },
    total: {
      type: Number,
      required: true,
      min: 0
    }
  },
  
  // Order Status and Timeline
  status: {
    type: String,
    enum: [
      'pending',           // Order placed, waiting for seller acceptance
      'accepted',          // Seller accepted the order
      'in-progress',       // Work has started
      'delivered',         // Initial delivery completed
      'revision-requested', // Buyer requested revisions
      'revision-delivered', // Seller delivered revisions
      'completed',         // Order completed and accepted
      'cancelled',         // Order cancelled
      'disputed',          // Order in dispute
      'refunded'          // Order refunded
    ],
    default: 'pending'
  },
  
  // Important Dates
  acceptedAt: Date,
  startedAt: Date,
  dueDate: {
    type: Date,
    required: true
  },
  deliveredAt: Date,
  completedAt: Date,
  cancelledAt: Date,
  
  // Deliverables
  deliverables: [{
    type: {
      type: String,
      enum: ['text', 'file', 'link'],
      required: true
    },
    content: String, // for text deliverables
    files: [{
      filename: String,
      url: String,
      publicId: String,
      fileSize: Number,
      fileType: String
    }],
    deliveredAt: {
      type: Date,
      default: Date.now
    }
  }],
  
  // Communication and Updates
  messages: [{
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    message: {
      type: String,
      required: true,
      maxlength: [1000, 'Message cannot exceed 1000 characters']
    },
    files: [{
      filename: String,
      url: String,
      publicId: String
    }],
    timestamp: {
      type: Date,
      default: Date.now
    },
    isSystemMessage: {
      type: Boolean,
      default: false
    }
  }],
  
  // Revision Tracking
  revisions: [{
    requestedAt: {
      type: Date,
      default: Date.now
    },
    reason: {
      type: String,
      required: true,
      maxlength: [500, 'Revision reason cannot exceed 500 characters']
    },
    deliveredAt: Date,
    isCompleted: {
      type: Boolean,
      default: false
    }
  }],
  revisionsUsed: {
    type: Number,
    default: 0
  },
  
  // Payment Information
  payment: {
    method: {
      type: String,
      enum: ['stripe', 'razorpay', 'paypal', 'wallet'],
      required: true
    },
    transactionId: String,
    paymentIntentId: String, // for Stripe
    status: {
      type: String,
      enum: ['pending', 'paid', 'failed', 'refunded', 'partially_refunded'],
      default: 'pending'
    },
    paidAt: Date,
    refundedAt: Date,
    refundAmount: {
      type: Number,
      default: 0
    }
  },
  
  // Rating and Review (after completion)
  review: {
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    comment: {
      type: String,
      maxlength: [1000, 'Review comment cannot exceed 1000 characters']
    },
    reviewedAt: Date
  },
  
  // Dispute Information
  dispute: {
    reason: String,
    description: String,
    initiatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    initiatedAt: Date,
    status: {
      type: String,
      enum: ['open', 'under-review', 'resolved', 'closed']
    },
    resolution: String,
    resolvedAt: Date,
    resolvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  
  // Metadata
  metadata: {
    userAgent: String,
    ipAddress: String,
    referrer: String
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for order age
orderSchema.virtual('orderAge').get(function() {
  return Math.floor((Date.now() - this.createdAt) / (1000 * 60 * 60 * 24));
});

// Virtual for time remaining
orderSchema.virtual('timeRemaining').get(function() {
  if (!this.dueDate) return null;
  const remaining = this.dueDate - Date.now();
  return remaining > 0 ? Math.ceil(remaining / (1000 * 60 * 60 * 24)) : 0;
});

// Virtual for is overdue
orderSchema.virtual('isOverdue').get(function() {
  return this.dueDate && Date.now() > this.dueDate && !['completed', 'cancelled', 'refunded'].includes(this.status);
});

// Indexes for better query performance
orderSchema.index({ orderNumber: 1 }, { unique: true });
orderSchema.index({ buyer: 1, status: 1 });
orderSchema.index({ seller: 1, status: 1 });
orderSchema.index({ service: 1 });
orderSchema.index({ createdAt: -1 });
orderSchema.index({ dueDate: 1 });
orderSchema.index({ 'payment.status': 1 });
orderSchema.index({ status: 1, createdAt: -1 });

// Pre-save middleware to generate order number
orderSchema.pre('save', async function(next) {
  if (this.isNew && !this.orderNumber) {
    const count = await this.constructor.countDocuments();
    this.orderNumber = `TH${Date.now().toString().slice(-8)}${(count + 1).toString().padStart(4, '0')}`;
  }
  
  // Calculate due date if not set
  if (this.isNew && !this.dueDate && this.packageDetails.deliveryTime) {
    this.dueDate = new Date(Date.now() + (this.packageDetails.deliveryTime * 24 * 60 * 60 * 1000));
  }
  
  next();
});

// Method to add message
orderSchema.methods.addMessage = function(senderId, message, files = [], isSystemMessage = false) {
  this.messages.push({
    sender: senderId,
    message,
    files,
    isSystemMessage
  });
  return this.save();
};

// Method to update status
orderSchema.methods.updateStatus = function(newStatus, userId = null) {
  const now = new Date();
  
  // Update status-specific timestamps
  switch (newStatus) {
    case 'accepted':
      this.acceptedAt = now;
      break;
    case 'in-progress':
      this.startedAt = now;
      break;
    case 'delivered':
      this.deliveredAt = now;
      break;
    case 'completed':
      this.completedAt = now;
      break;
    case 'cancelled':
      this.cancelledAt = now;
      break;
  }
  
  this.status = newStatus;
  
  // Add system message for status change
  const statusMessages = {
    'accepted': 'Order has been accepted by the seller',
    'in-progress': 'Work has started on your order',
    'delivered': 'Order has been delivered',
    'completed': 'Order has been marked as completed',
    'cancelled': 'Order has been cancelled',
    'disputed': 'A dispute has been raised for this order'
  };
  
  if (statusMessages[newStatus]) {
    this.messages.push({
      sender: userId,
      message: statusMessages[newStatus],
      isSystemMessage: true
    });
  }
  
  return this.save();
};

// Method to request revision
orderSchema.methods.requestRevision = function(reason) {
  if (this.revisionsUsed >= this.packageDetails.revisions) {
    throw new Error('No revisions remaining');
  }
  
  this.revisions.push({ reason });
  this.revisionsUsed += 1;
  this.status = 'revision-requested';
  
  return this.save();
};

export default mongoose.model('Order', orderSchema);