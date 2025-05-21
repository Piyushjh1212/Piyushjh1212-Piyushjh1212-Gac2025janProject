// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Loginpage/Login';
import AdminDashboard from './Admindashboard/Admindashboard';
import Addimage from './Admindashboard/AddImage/create_Add_image';
import Creat_Add_Image from './Admindashboard/AddImage/create_Add_image';
import FormRequest from './Admindashboard/Userdata/Total_Form_Request/FormRequest';
import CreateProduct from './Admindashboard/AddImage/createProduct';
import User_Data from './Admindashboard/Userdata/User_Data';
import UserdataDisplay from './Admindashboard/Userdata/Total_User/UserdataDisplay';
import UserTotalPayment from './Admindashboard/Userdata/Total_Payment_collection/UserTotalPayment';
import Setting from './Admindashboard/Setting';
import VideoUpload from './Uploader/VidoeUploader/VidoeUpload';
import Create_add_vedio from './Admindashboard/Addvideo/create_add_video';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Login />} /> */}
        <Route path="/" element={<AdminDashboard />} />

        {/* Admin Dashboard */}
        <Route path="/admin/User-data" element={<User_Data />} />
        <Route path="/admin/add-product" element={<Addimage />} />
        <Route path="/admin/add-Product-image" element={<Creat_Add_Image />} />
        <Route path="/admin/add-Vedio" element={<Create_add_vedio/>} />
        <Route path="/admin/add-vedi" element={<VideoUpload/>}/>
        <Route path="/admin/manage-settings" element={<Setting/>} />

        {/* In user_data */}
        <Route path="/admin/Userdata_Display" element={<UserdataDisplay/>} />
        <Route path="/admin/Userpayment_Display" element={<UserTotalPayment/>}/>
        <Route path="/admin/FormDisplay" element={<FormRequest />} />
        <Route path="/hello" element={<CreateProduct/>}/>
      </Routes>
    </Router>
  );
}
