const express = require('express');
const Order = require('../models/Order');
const Cake = require('../models/Cake');
const { protect, adminOnly } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/orders
// @desc    Get orders (user gets their own, admin gets all)
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    let query = {};
    
    // Non-admin users can only see their own orders
    if (req.user.role !== 'admin') {
      query.userId = req.user._id;
    }

    // Optional status filter
    if (req.query.status) {
      query.status = req.query.status;
    }

    const orders = await Order.find(query)
      .populate('userId', 'name email')
      .sort({ createdAt: -1 });

    res.json({
      count: orders.length,
      orders
    });
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({ message: 'Error fetching orders', error: error.message });
  }
});

// @route   GET /api/orders/:id
// @desc    Get single order by ID
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('userId', 'name email')
      .populate('cakeId');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Check if user owns the order or is admin
    if (order.userId._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to view this order' });
    }

    res.json({ order });
  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({ message: 'Error fetching order', error: error.message });
  }
});

// @route   POST /api/orders
// @desc    Create a new order
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const { cakeId, customization, quantity, deliveryDate, deliveryAddress, notes } = req.body;

    // Validate required fields
    if (!cakeId || !customization || !customization.size || !customization.flavor) {
      return res.status(400).json({ message: 'Please provide cakeId and customization (size, flavor)' });
    }

    // Verify cake exists
    const cake = await Cake.findById(cakeId);
    if (!cake) {
      return res.status(404).json({ message: 'Cake not found' });
    }

    // Calculate total price (can add size-based pricing logic here)
    const qty = quantity || 1;
    let priceMultiplier = 1;
    
    // Size-based pricing
    if (customization.size === '8 inch') priceMultiplier = 1.3;
    if (customization.size === '10 inch') priceMultiplier = 1.6;
    if (customization.size === '12 inch') priceMultiplier = 2;
    if (customization.size === '3 tier') priceMultiplier = 1;
    if (customization.size === '4 tier') priceMultiplier = 1.3;
    if (customization.size === '5 tier') priceMultiplier = 1.6;
    
    const totalPrice = cake.price * priceMultiplier * qty;

    const order = await Order.create({
      userId: req.user._id,
      cakeId,
      customization,
      quantity: qty,
      totalPrice,
      deliveryDate,
      deliveryAddress,
      notes,
      status: 'pending'
    });

    // Populate cake info for response
    await order.populate('cakeId', 'name price image');

    res.status(201).json({
      message: 'Order placed successfully',
      order
    });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ message: 'Error creating order', error: error.message });
  }
});

// @route   PUT /api/orders/:id
// @desc    Update order status
// @access  Private/Admin
router.put('/:id', protect, adminOnly, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: 'Please provide status' });
    }

    const validStatuses = ['pending', 'confirmed', 'preparing', 'ready', 'delivered', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: `Invalid status. Must be one of: ${validStatuses.join(', ')}` });
    }

    order.status = status;
    await order.save();

    res.json({
      message: 'Order status updated',
      order
    });
  } catch (error) {
    console.error('Update order error:', error);
    res.status(500).json({ message: 'Error updating order', error: error.message });
  }
});

// @route   DELETE /api/orders/:id
// @desc    Cancel/Delete an order
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Users can only cancel their own pending orders, admins can cancel any
    if (req.user.role !== 'admin') {
      if (order.userId.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'Not authorized to cancel this order' });
      }
      if (order.status !== 'pending') {
        return res.status(400).json({ message: 'Can only cancel pending orders' });
      }
    }

    await Order.findByIdAndDelete(req.params.id);

    res.json({ message: 'Order cancelled successfully' });
  } catch (error) {
    console.error('Delete order error:', error);
    res.status(500).json({ message: 'Error cancelling order', error: error.message });
  }
});

module.exports = router;
