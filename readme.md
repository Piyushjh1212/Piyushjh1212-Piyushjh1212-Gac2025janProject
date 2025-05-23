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

| Layer / Component               | Description                                                                                         |
| ------------------------------- | --------------------------------------------------------------------------------------------------- |
| **User (Client Side)**          | Web Browser (Desktop / Mobile) - Accesses the platform                                              |
| **Frontend (React.js)**         | - Student & Admin interfaces<br>- Course dashboard<br>- Responsive UI/UX                            |
| **Backend (Node.js + Express)** | - REST APIs for auth, course, admin, payments<br>- JWT-based authentication                         |
| **Database (MongoDB)**          | - Stores users, courses, orders/payments<br>- Hosted on MongoDB Atlas                               |
| **Third-party Services**        | - **Razorpay**: Payment gateway integration (₹799 course)<br>- **Cloudinary**: Media upload/storage |
| **Deployment (Optional)**       | - Frontend: Vercel / Netlify<br>- Backend: Render / Railway<br>- DB: MongoDB Atlas                  |


## Project Dependencies

| Package         | Version         | Description                               |
| --------------- | --------------- | ----------------------------------------- |
| `express`       | ^4.21.2         | Web framework for Node.js                 |
| `mongoose`      | ^8.9.6          | MongoDB ODM for Node.js                   |
| `dotenv`        | ^16.4.7         | Load environment variables                |
| `cors`          | ^2.8.5          | Enable Cross-Origin Resource Sharing      |
| `cookie-parser` | ^1.4.7          | Parse cookies in requests                 |
| `jsonwebtoken`  | ^9.0.2          | For authentication with JWTs              |
| `bcrypt`        | ^5.1.1          | Password hashing                          |
| `bcryptjs`      | ^2.4.3          | Alternative password hashing library      |
| `cloudinary`    | ^2.5.1          | Cloud image & video storage               |
| `multer`        | ^1.4.5-lts.1    | File upload handling                      |
| `datauri`       | ^4.1.0          | Converts buffer/stream into Data URI      |
| `streamifier`   | ^0.1.1          | Converts streams into buffer              |
| `validator`     | ^13.15.0        | String validation and sanitization        |
| `sanitize-html` | ^2.16.0         | Prevents HTML injection                   |
| `pdfkit`        | ^0.16.0         | Generate PDFs programmatically            |
| `razorpay`      | ^2.9.5          | Razorpay payment integration              |
| `nodemailer`    | ^6.10.1         | Send emails from backend                  |
| `body-parser`   | ^1.20.3         | Middleware to parse incoming request body |
| `morgan`        | ^1.10.0         | HTTP request logger                       |
| `fs`            | ^0.0.1-security | File system handling (legacy import)      |
| `crypto`        | ^1.0.1          | Cryptographic functions                   |



##  Contact

Created by Piyush Jhariya
Founder, Growall Coaching

Email - piyushjhariya65@gmial.com

website avaiable -

https://growallcoaching.in (update if available)