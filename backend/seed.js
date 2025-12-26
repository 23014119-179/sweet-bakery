const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('./models/User');
const Cake = require('./models/Cake');

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/cake-bakery');
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Cake.deleteMany({});
    console.log('Cleared existing data');

    // Create admin user
    const adminPassword = await bcrypt.hash('admin123', 12);
    await User.create({
      name: 'Admin User',
      email: 'admin@cakebakery.com',
      password: adminPassword,
      role: 'admin'
    });
    console.log('Created admin user (email: admin@cakebakery.com, password: admin123)');

    // Create sample cakes
    const cakes = [
      {
        name: 'Classic Chocolate Dream',
        description: 'Rich, moist chocolate layers with silky ganache frosting, topped with fresh berries and gold dust.',
        price: 65,
        image: '/cake-chocolate.jpg',
        category: 'birthday',
        customizableOptions: {
          sizes: ['6 inch', '8 inch', '10 inch'],
          flavors: ['Dark Chocolate', 'Milk Chocolate', 'Double Chocolate'],
          canAddMessage: true
        },
        featured: true
      },
      {
        name: 'Vanilla Blossom',
        description: 'Light and fluffy vanilla cake with buttercream frosting, decorated with edible flowers and gold leaf.',
        price: 55,
        image: '/cake-vanilla.jpg',
        category: 'birthday',
        customizableOptions: {
          sizes: ['6 inch', '8 inch', '10 inch'],
          flavors: ['French Vanilla', 'Madagascar Vanilla', 'Vanilla Bean'],
          canAddMessage: true
        },
        featured: true
      },
      {
        name: 'Red Velvet Romance',
        description: 'Stunning red velvet layers with cream cheese frosting, perfect for romantic celebrations.',
        price: 70,
        image: '/cake-red-velvet.jpg',
        category: 'custom',
        customizableOptions: {
          sizes: ['6 inch', '8 inch', '10 inch', '12 inch'],
          flavors: ['Classic Red Velvet', 'Blue Velvet', 'Pink Velvet'],
          canAddMessage: true
        },
        featured: true
      },
      {
        name: 'Strawberry Shortcake Bliss',
        description: 'Fresh strawberries layered with whipped cream and light sponge cake, dusted with powdered sugar.',
        price: 60,
        image: '/cake-strawberry.jpg',
        category: 'seasonal',
        customizableOptions: {
          sizes: ['6 inch', '8 inch'],
          flavors: ['Classic Strawberry', 'Strawberry Lemon', 'Mixed Berry'],
          canAddMessage: true
        },
        featured: false
      },
      {
        name: 'Elegant Wedding Tier',
        description: 'Sophisticated multi-tier wedding cake with intricate lace patterns and sugar flowers.',
        price: 350,
        image: '/cake-wedding.jpg',
        category: 'wedding',
        customizableOptions: {
          sizes: ['3 tier', '4 tier', '5 tier'],
          flavors: ['Vanilla', 'Champagne', 'Lemon', 'Chocolate'],
          canAddMessage: false
        },
        featured: true
      },
      {
        name: 'Rainbow Celebration',
        description: 'Colorful rainbow layers with vanilla buttercream, covered in sprinkles and topped with candles.',
        price: 75,
        image: '/cake-birthday.jpg',
        category: 'birthday',
        customizableOptions: {
          sizes: ['6 inch', '8 inch', '10 inch'],
          flavors: ['Vanilla Rainbow', 'Chocolate Rainbow', 'Funfetti'],
          canAddMessage: true
        },
        featured: true
      }
    ];

    await Cake.insertMany(cakes);
    console.log('Created sample cakes');

    console.log('\n✅ Database seeded successfully!');
    console.log('\nAdmin credentials:');
    console.log('Email: admin@cakebakery.com');
    console.log('Password: admin123');

    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

seedData();
