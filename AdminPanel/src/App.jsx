// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Loginpage/Login';
import AdminDashboard from './Admindashboard/Admindashboard';
import AddVideo from './Admindashboard/Addvedio';
import Addimage from './Admindashboard/AddImage/create_Add_image';
import Users from './Admindashboard/Userdata/User_Data';
import Creat_Add_Image from './Admindashboard/AddImage/create_Add_image';
import FormRequest from './Admindashboard/Userdata/Total_Form_Request/FormRequest';
import CreateProduct from './Admindashboard/AddImage/createProduct';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard />} />

        {/* Admin Dashboard */}

        <Route path="/admin/User-data" element={<Users />} />
        <Route path="/admin/add-product" element={<Addimage />} />
        <Route path="/admin/add-Product-image" element={<Creat_Add_Image />} />

        {/* In user_data */}

        <Route path="/admin/FormDisplay" element={<FormRequest />} />
        <Route path="/hello" element={<CreateProduct/>}/>
      </Routes>
    </Router>
  );
}
