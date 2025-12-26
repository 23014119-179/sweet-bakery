const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required']
  },
  cakeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cake',
    required: [true, 'Cake ID is required']
  },
  customization: {
    size: {
      type: String,
      required: [true, 'Size is required']
    },
    flavor: {
      type: String,
      required: [true, 'Flavor is required']
    },
    message: {
      type: String,
      maxlength: [100, 'Message cannot exceed 100 characters']
    }
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
    min: [1, 'Quantity must be at least 1'],
    default: 1
  },
  totalPrice: {
    type: Number,
    required: [true, 'Total price is required'],
    min: [0, 'Price cannot be negative']
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'preparing', 'ready', 'delivered', 'cancelled'],
    default: 'pending'
  },
  deliveryDate: {
    type: Date
  },
  deliveryAddress: {
    street: String,
    city: String,
    state: String,
    zipCode: String
  },
  notes: {
    type: String,
    maxlength: [500, 'Notes cannot exceed 500 characters']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update timestamp on save
orderSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Populate cake and user on find
orderSchema.pre(/^find/, function(next) {
  this.populate('cakeId', 'name price image');
  next();
});

module.exports = mongoose.model('Order', orderSchema);
