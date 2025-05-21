## Growall Coaching – Fullstack EdTech Platform

Growall Coaching is a modern and feature-rich fullstack web application built to deliver a seamless online education experience. Developed using the MERN stack (MongoDB, Express.js, React.js, Node.js), it enables students to purchase lifetime access to premium HTML & CSS courses, track their learning progress, and interact with content via a dynamic dashboard.

## Live Demo

[ Coming Soon]
Add your deployed URL once available

## Features
 
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


## Technology Stack

| Frontend | Backend             | Database | Other Integrations                                      |
| -------- | ------------------- | -------- | ------------------------------------------------------- |
| React.js | Node.js, Express.js | MongoDB  | JWT Auth, Cloudinary (file upload), Razorpay (payments) |

## Project Structure
### 📁 Project Structure

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

## Architecture Diagram

| Layer / Component               | Description                                                                                         |
| ------------------------------- | --------------------------------------------------------------------------------------------------- |
| **User (Client Side)**          | Web Browser (Desktop / Mobile) - Accesses the platform                                              |
| **Frontend (React.js)**         | - Student & Admin interfaces<br>- Course dashboard<br>- Responsive UI/UX                            |
| **Backend (Node.js + Express)** | - REST APIs for auth, course, admin, payments<br>- JWT-based authentication                         |
| **Database (MongoDB)**          | - Stores users, courses, orders/payments<br>- Hosted on MongoDB Atlas                               |
| **Third-party Services**        | - **Razorpay**: Payment gateway integration (₹799 course)<br>- **Cloudinary**: Media upload/storage |
| **Deployment (Optional)**       | - Frontend: Vercel / Netlify<br>- Backend: Render / Railway<br>- DB: MongoDB Atlas                  |
