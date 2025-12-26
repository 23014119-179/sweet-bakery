const mongoose = require('mongoose');

const cakeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Cake name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  image: {
    type: String,
    default: '/placeholder-cake.jpg'
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['birthday', 'wedding', 'custom', 'seasonal']
  },
  customizableOptions: {
    sizes: {
      type: [String],
      default: ['6 inch', '8 inch', '10 inch']
    },
    flavors: {
      type: [String],
      default: ['Vanilla', 'Chocolate', 'Strawberry']
    },
    canAddMessage: {
      type: Boolean,
      default: true
    }
  },
  featured: {
    type: Boolean,
    default: false
  },
  available: {
    type: Boolean,
    default: true
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
cakeSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Cake', cakeSchema);
