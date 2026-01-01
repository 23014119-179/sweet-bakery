# Sweet Order Forge - E-Commerce Bakery Website

## Project Description

Sweet Order Forge is a full-stack e-commerce web application for a bakery, allowing users to browse and order a variety of cakes, pastries, and other sweets. The application provides a user-friendly interface, secure authentication, and smooth ordering experience, built using the MERN stack (MongoDB, Express, React, Node.js).

## Features

* **User Features:**

  * Browse products with images and descriptions
  * Add items to cart
  * Secure user authentication and signup/login
  * Checkout and order placement
  * User dashboard for viewing orders

* **Admin Features:**

  * Admin panel to manage products
  * View and manage user orders

* **Frontend Features:**

  * Responsive design (mobile & desktop)
  * Smooth navigation and transitions
  * Dynamic product listing
  * Customizable tab title and favicon

* **Backend Features:**

  * RESTful API endpoints for products, users, and orders
  * MongoDB database for storing data
  * JWT-based authentication

## Tech Stack

* **Frontend:** React, Tailwind CSS, Vite, Lucide Icons
* **Backend:** Node.js, Express
* **Database:** MongoDB (Atlas)
* **Authentication:** JWT
* **Deployment:** Vercel (Frontend), Render/Railway (Backend)

## Folder Structure

```
project-root/
├─ frontend/          # React frontend code
│  ├─ public/         # Static files, favicon, index.html
│  ├─ src/            # React components, pages, context
│  ├─ package.json    # Frontend dependencies
├─ backend/           # Node/Express backend
│  ├─ models/         # MongoDB schemas
│  ├─ routes/         # API routes
│  ├─ controllers/    # Route logic
│  ├─ server.js       # Main backend server
│  ├─ package.json    # Backend dependencies
├─ .gitignore
└─ README.md
```

## Installation & Setup

### Clone the Repository

```bash
git clone https://github.com/Umar-Tariq160/sweet-order-forge.git
cd sweet-order-forge
```

### Backend Setup

```bash
cd backend
npm install
# Create a .env file with the following:
# PORT=5000
# MONGO_URI=your_mongodb_connection_string
npm run dev
```

Backend will run on `http://localhost:5000`.

### Frontend Setup

```bash
cd frontend
npm install
npm run dev  # For Vite development server
```

Frontend will run on `http://localhost:5173` (or similar port shown in terminal).

### Environment Variables for Frontend

* Create `.env` in frontend:

```
VITE_API_URL=http://localhost:5000/api
```

## Deployment

### Frontend (Vercel)

1. Push the frontend to GitHub.
2. Connect the repo to Vercel.
3. Set the **Root Directory** to `frontend`.
4. Set build command:

   * CRA: `npm run build`
   * Vite: `npm run build`
5. Set output directory:

   * CRA: `build`
   * Vite: `dist`
6. Deploy → Site will be live at `https://your-project-name.vercel.app`

### Backend (Render / Railway)

1. Push backend code to GitHub.
2. Create a new Web Service on Render or Railway.
3. Connect the GitHub repo.
4. Set environment variables:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

5. Deploy → Backend URL will be like `https://sweet-bakery-backend.onrender.com`

### Connect Frontend to Backend

* Update frontend `.env`:

```
VITE_API_URL=https://sweet-bakery-backend.onrender.com/api
```

* Rebuild & redeploy frontend.

## Usage

1. Open the frontend URL in browser.
2. Browse cakes, add items to cart.
3. Signup/Login to place orders.
4. Admin can login to manage products and orders.



## Contribution

1. Fork the repository.
2. Create a new branch for your feature.
3. Commit your changes.
4. Push to your fork and create a pull request.

## License

This project is open-source and available under the MIT License.

---

**GitHub Repository:** [https://github.com/Umar-Tariq160/sweet-order-forge](https://github.com/Umar-Tariq160/sweet-order-forge)
