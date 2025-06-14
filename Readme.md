## Project Title - Growall Coaching ~~ An Edtech platform

**Growall Coaching** is a full-stack EdTech platform built with the MERN stack, offering lifetime access to premium HTML & CSS courses, secure payments, and personalized learning dashboards.



## Fullstack EdTech Platform

Growall Coaching is a modern and feature-rich fullstack web application built to deliver a seamless online education experience. Developed using the MERN stack (MongoDB, Express.js, React.js, Node.js), it enables students to purchase lifetime access to premium HTML & CSS courses, track their learning progress, and interact with content via a dynamic dashboard.

## Live

[ Coming Soon] - Add your deployed URL once available

## Features

## Technology Stack

| Frontend | Backend             | Database | Other Integrations                                      |
| -------- | ------------------- | -------- | ------------------------------------------------------- |
| React.js | Node.js, Express.js | MongoDB  | JWT Auth, Cloudinary (file upload), Razorpay (payments) |


# Student Panel


-  One-time course purchase – ₹799, valid for 5 years  
-  Fully responsive and clean UI/UX  
-  Stream video lessons and download resources  
-  Real-time progress tracking  
-  Secure login and access to student dashboard  



# Admin Panel

-  Manage users (view, block/unblock)
-  Add/update course content
-  View and track payment history
-  Admin dashboard with analytics: Total users, Signups, Payments




## Project Structure
###  Project Structure

| Folder / File           | Description                                      |
|-------------------------|--------------------------------------------------|
| `backend/`              | Node.js + Express backend                        |
| ├── `controllers/`      | API logic (auth, course, admin, etc.)            |
| ├── `models/`           | Mongoose schemas for MongoDB                     |
| ├── `routes/`           | Express API routes                               |
| ├── `utils/`            | Utilities like JWT, payment integrations         |
| └── `server.js`         | Backend entry point                              |
|                         |                                                  |
| `frontend/`             | React.js frontend                                |
| ├── `components/`       | Reusable React components                        |
| ├── `pages/`            | Pages like Login, Dashboard, Course, etc.        |
| ├── `App.js`            | Main application component                       |
| └── `index.js`          | React DOM render entry point                     |
|                         |                                                  |
| `README.md`             | Project documentation                            |


## Environment Variable

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
RAZORPAY_KEY_ID=your_key
RAZORPAY_SECRET=your_secret
CLOUDINARY_CLOUD_NAME=your_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret

## Module 


| Module          | Description                                      |
| --------------- | ------------------------------------------------ |
| `User Auth`     | Signup, Login, Session-based access              |
| `Course Access` | Paid content access control                      |
| `Checkout`      | One-time payment flow (Razorpay/Stripe/UPI)      |
| `Contact`       | Support form for user queries                    |
| `Dashboard`     | View course progress and certificate eligibility |
| `Admin Panel`   | View users, course sales (optional)              |


## Architecture Diagram

| **Layer / Component**       | **Description / Role**                                       | **Technology Used**                                     |
| --------------------------- | ------------------------------------------------------------ | ------------------------------------------------------- |
| 👨‍💻 **Client (Frontend)** | User interface: dashboard, login/signup, course player       | React.js, Axios, React Router DOM                       |
| 🔐 **Authentication**       | Secure login with token-based auth, role handling            | JWT, HttpOnly Cookies                                   |
| 🚀 **Routing (Frontend)**   | Navigate through pages and protect routes (private/public)   | React Router, Protected Routes                          |
| 🌐 **API Layer (Backend)**  | Handles business logic and routes for user, courses, payment | Node.js, Express.js                                     |
| 📊 **Admin Panel**          | Admin dashboard to add courses, view users, manage content   | React (Admin View), JWT + Role Check                    |
| 💰 **Payment Gateway**      | One-time course purchase and verification                    | Razorpay or Stripe                                      |
| 💾 **Database**             | Stores users, courses, progress, transactions                | MongoDB, Mongoose ORM                                   |
| 🧠 **Progress Tracker**     | Tracks course completion and learning analytics              | Embedded in MongoDB User Schema                         |
| ☁️ **Media Storage**        | Stores course images, videos, and thumbnails                 | Cloudinary                                              |
| ⏳ **Access Validity Logic** | Restricts access after 5 years from purchase date            | Custom Date Logic in Backend                            |
| 🌍 **Deployment**           | Hosting the frontend, backend, and DB                        | Vercel (Frontend), Render (Backend), MongoDB Atlas (DB) |


## Project Dependencies

| Package                   | Description                                                    |
| ------------------------- | -------------------------------------------------------------- |
| `mongoose`                | MongoDB ODM for Node.js                                        |
| `dotenv`                  | Loads environment variables from a `.env` file                 |
| `cors`                    | Enable Cross-Origin Resource Sharing                           |
| `cookie-parser`           | Parse cookies attached to the client request object            |
| `jsonwebtoken`            | Generate and verify JSON Web Tokens (JWT)                      |
| `bcrypt`                  | Library to hash and compare passwords securely                 |
| `bcryptjs`                | Pure JavaScript version of bcrypt for password hashing         |
| `cloudinary`              | Upload and manage images/videos via Cloudinary                 |
| `multer`                  | Middleware for handling file uploads (`multipart/form-data`)   |
| `datauri`                 | Converts files/buffers/streams to data URI                     |
| `streamifier`             | Converts streams into buffers, useful for file uploads         |
| `validator`               | Validate and sanitize strings (emails, URLs, etc.)             |
| `sanitize-html`           | Prevent XSS by sanitizing HTML input                           |
| `pdfkit`                  | Generate PDF documents in Node.js                              |
| `razorpay`                | Integrate Razorpay payment gateway                             |
| `nodemailer`              | Send emails using SMTP or third-party services                 |
| `body-parser`             | Parse incoming request bodies in middleware                    |
| `morgan`                  | HTTP request logger middleware for Node.js                     |
| `fs`                      | File System API (built-in in Node.js, handles file operations) |
| `crypto`                  | Provides cryptographic functionalities like hashing            |
| `passport`                | Authentication middleware for Node.js                          |
| `passport-google-oauth20` | Google OAuth 2.0 authentication strategy for Passport          |
| `express-session`         | Middleware to manage user sessions                             |




##  Contact

Created by Piyush Jhariya
Founder, Growall Coaching

Email - piyushjhariya65@gmial.com

website avaiable -

https://growallcoaching.in (update if available)