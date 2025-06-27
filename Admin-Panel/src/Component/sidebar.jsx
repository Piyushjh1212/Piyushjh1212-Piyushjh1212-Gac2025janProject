// src/components/Sidebar.jsx
import { Link } from "react-router-dom";
import "./sidebar.css";

const Sidebar = () => {
  return (
    <div
      style={{
        width: "200px",
        height: "100vh",
        background: "#111",
        color: "#fff",
        padding: "20px",
      }}
    >
      <h2>Admin Panel</h2>
      <nav>
        <ul>
          <li>
            <Link className="Li_link" to="/">
              Dashboard
            </Link>
          </li>
          <li>
            <Link className="Li_link" to="/users">
              Users
            </Link>
          </li>
          <li>
            <Link className="Li_link" to="/courses">
              Add_courses
            </Link>
          </li>
          <li>
            <Link className="Li_link" to="/My_Courses">
              Add_My_products
            </Link>
          </li>
           <li>
            <Link className="Li_link" to="/Add_My_Courses_Content">
              Add_Courses_content
            </Link>
          </li>
          <li>
            <Link className="Li_link" to="/Payment-Orders">
              PaymentOrders
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
