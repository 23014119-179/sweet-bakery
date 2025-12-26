const express = require('express');
const Cake = require('../models/Cake');
const { protect, adminOnly } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/cakes
// @desc    Get all cakes (with optional filters)
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { category, featured, search, available } = req.query;
    
    let query = {};
    
    if (category) {
      query.category = category;
    }
    
    if (featured === 'true') {
      query.featured = true;
    }
    
    if (available !== 'false') {
      query.available = true;
    }
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const cakes = await Cake.find(query).sort({ createdAt: -1 });
    
    res.json({
      count: cakes.length,
      cakes
    });
  } catch (error) {
    console.error('Get cakes error:', error);
    res.status(500).json({ message: 'Error fetching cakes', error: error.message });
  }
});

// @route   GET /api/cakes/:id
// @desc    Get single cake by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const cake = await Cake.findById(req.params.id);
    
    if (!cake) {
      return res.status(404).json({ message: 'Cake not found' });
    }
    
    res.json({ cake });
  } catch (error) {
    console.error('Get cake error:', error);
    res.status(500).json({ message: 'Error fetching cake', error: error.message });
  }
});

// @route   POST /api/cakes
// @desc    Create a new cake
// @access  Private/Admin
router.post('/', protect, adminOnly, async (req, res) => {
  try {
    const { name, description, price, image, category, customizableOptions, featured } = req.body;

    // Validate required fields
    if (!name || !description || !price || !category) {
      return res.status(400).json({ message: 'Please provide name, description, price, and category' });
    }

    const cake = await Cake.create({
      name,
      description,
      price,
      image,
      category,
      customizableOptions,
      featured: featured || false
    });

    res.status(201).json({
      message: 'Cake created successfully',
      cake
    });
  } catch (error) {
    console.error('Create cake error:', error);
    res.status(500).json({ message: 'Error creating cake', error: error.message });
  }
});

// @route   PUT /api/cakes/:id
// @desc    Update a cake
// @access  Private/Admin
router.put('/:id', protect, adminOnly, async (req, res) => {
  try {
    const cake = await Cake.findById(req.params.id);
    
    if (!cake) {
      return res.status(404).json({ message: 'Cake not found' });
    }

    const updatedCake = await Cake.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json({
      message: 'Cake updated successfully',
      cake: updatedCake
    });
  } catch (error) {
    console.error('Update cake error:', error);
    res.status(500).json({ message: 'Error updating cake', error: error.message });
  }
});

// @route   DELETE /api/cakes/:id
// @desc    Delete a cake
// @access  Private/Admin
router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    const cake = await Cake.findById(req.params.id);
    
    if (!cake) {
      return res.status(404).json({ message: 'Cake not found' });
    }

    await Cake.findByIdAndDelete(req.params.id);

    res.json({ message: 'Cake deleted successfully' });
  } catch (error) {
    console.error('Delete cake error:', error);
    res.status(500).json({ message: 'Error deleting cake', error: error.message });
  }
});

module.exports = router;
