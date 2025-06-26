import React, { useContext } from "react";
import "../Styles/Header.css";
import { GacContext } from "../Pages/GacContext/GacContext";
import { useState } from "react";
import { useRef } from "react";

export default function Header() {
  const { user } = useContext(GacContext);
   const [showProfileMenu, setShowProfileMenu] = useState(false);

  const HandleRedirect = (path) => {
    window.location.href = path;
  };

  const profileIconRef = useRef(null);

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
              <div
              className="Header_ProfileIcon"
              role="button"
              aria-label="Toggle profile menu"
              aria-expanded={showProfileMenu}
              onClick={() => setShowProfileMenu((prev) => !prev)}
              ref={profileIconRef}
            >
              <img
                src="https://res.cloudinary.com/dieboinjz/image/upload/v1739719843/mern-uploads/atrbtbitbymngbjrldsn.webp"
                alt="Profile"
                width={50}
                height={50}
              />
            </div>
        )}
      </div>
    </header>
  );
}
