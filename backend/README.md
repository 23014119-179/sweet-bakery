# Cake Bakery API

Express.js + MongoDB backend for the Custom Cake Bakery application.

## Setup Instructions

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment

Copy `.env.example` to `.env` and update the values:

```bash
cp .env.example .env
```

Edit `.env`:
- `MONGODB_URI`: Your MongoDB connection string
- `JWT_SECRET`: A strong random string for JWT signing
- `PORT`: Server port (default: 5000)
- `FRONTEND_URL`: Your React frontend URL (for CORS)

### 3. Start MongoDB

Make sure MongoDB is running locally, or use MongoDB Atlas for cloud hosting.

### 4. Seed the Database

```bash
npm run seed
```

This creates:
- Admin user: `admin@cakebakery.com` / `admin123`
- Sample cakes

### 5. Start the Server

Development:
```bash
npm run dev
```

Production:
```bash
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Cakes
- `GET /api/cakes` - List all cakes (public)
- `GET /api/cakes/:id` - Get single cake (public)
- `POST /api/cakes` - Create cake (admin)
- `PUT /api/cakes/:id` - Update cake (admin)
- `DELETE /api/cakes/:id` - Delete cake (admin)

### Orders
- `GET /api/orders` - List orders (user: own, admin: all)
- `GET /api/orders/:id` - Get order details
- `POST /api/orders` - Create order (authenticated)
- `PUT /api/orders/:id` - Update order status (admin)
- `DELETE /api/orders/:id` - Cancel order

### Users
- `GET /api/users` - List all users (admin)
- `PUT /api/users/profile` - Update own profile
- `PUT /api/users/:id/role` - Update user role (admin)

## Deployment

### Railway
1. Create new project on Railway
2. Add MongoDB plugin or connect to MongoDB Atlas
3. Set environment variables
4. Deploy from GitHub

### Render
1. Create new Web Service
2. Connect your repository
3. Set build command: `npm install`
4. Set start command: `npm start`
5. Add environment variables

### Heroku
1. Create new app
2. Add MongoDB Atlas addon or set MONGODB_URI
3. Set config vars
4. Deploy from GitHub
