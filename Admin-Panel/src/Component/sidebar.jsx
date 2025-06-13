// src/components/Sidebar.jsx
import { Link } from 'react-router-dom';
import "./sidebar.css"

const Sidebar = () => {
  return (
    <div style={{ width: '200px', height: '100vh', background: '#111', color: '#fff', padding: '20px' }}>
      <h2>Admin Panel</h2>
      <nav>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li><Link style={{ color: '#fff' }} to="/">Dashboard</Link></li>
          <li><Link style={{ color: '#fff' }} to="/users">Users</Link></li>
          <li><Link style={{ color: '#fff' }} to="/courses">Add_courses</Link></li>
          <li><Link style={{ color: '#fff' }} to="/My_Courses">Add_My_products</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
