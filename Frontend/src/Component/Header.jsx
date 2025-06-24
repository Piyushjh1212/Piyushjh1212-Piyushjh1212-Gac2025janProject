import React, { useContext } from "react";
import "../Styles/Header.css";
import { GacContext } from "../Pages/GacContext/GacContext";

export default function Header() {
  const { user } = useContext(GacContext);

  const HandleRedirect = (path) => {
    window.location.href = path;
  };

  const HandleLogin = () => {
    window.location.href = "/Login";
  };

  return (
    <header className="Top_Header">
      <div className="Second_Top_Container">
        <div>
          <img
            src="https://res.cloudinary.com/dieboinjz/image/upload/v1739719838/mern-uploads/ejrkwcxdmqfjdxwyieo9.jpg"
            alt="image"
            width={50}
            height={50}
          />
        </div>
        <nav>
          <ul className="menu_list">
            <li onClick={() => HandleRedirect("/")}>Home</li>
            <li onClick={() => HandleRedirect("/About")}>About</li>
            <li onClick={() => HandleRedirect("/Courses")}> Courses</li>
            <li onClick={() => HandleRedirect("/contact")}>Contact</li>
            <li onClick={() => HandleRedirect("/iit-jee")}>IIT JEE</li>
            {!user ? "" : <li onClick={() => HandleRedirect("/iit-jee")}>My_Courses</li> } 
          </ul>
        </nav>

        {!user ? (
          <button className="Login_button" onClick={HandleLogin}>
            Login
          </button>
        ) : (
          <button className="Login_button" onClick={HandleLogin}>
            Welcome {user.data.name}
          </button>
        )}
      </div>
    </header>
  );
}
