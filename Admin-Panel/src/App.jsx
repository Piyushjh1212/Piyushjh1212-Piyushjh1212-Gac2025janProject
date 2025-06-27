// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './Component/sidebar';
import Users from './pages/Users';
import Dashboard from './pages/Dashboard';
import Add_Courses from './pages/AddCourses';
import CourseProducts from './pages/CourseProducts';
import PaymentOrders from './pages/PaymentOrders';
import AddCourseContent from './pages/AddCourseContent';


function App() {
  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <div style={{ padding: '20px', width: '100%' }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/users" element={<Users/>} />
            <Route path="/courses" element={<Add_Courses />} />
            <Route path = "/My_Courses" element = {<CourseProducts/>} />
            <Route path = "/Add_My_Courses_Content" element = {<AddCourseContent/>} />
            <Route path = "/Payment-Orders" element = {<PaymentOrders/>}/>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
