import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { useLogout } from "../../hooks/useLogout";
import { useAuthContext } from "../../hooks/useAuthContext";
import { FaUserCircle } from "react-icons/fa";
import { MdLogout } from "react-icons/md";

function Navbar() {
  const { logout } = useLogout();
  const [activeLink, setActiveLink] = useState("");
  const { user } = useAuthContext();

  const handleLinkClick = (linkName) => {
    setActiveLink(linkName === activeLink ? "" : linkName);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="navbar-container">
      <div className="logo">
        <Link to="/" className="logo-link">
          <p className="App-Title">ITPM-LINGO</p>
        </Link>
      </div>

      <div className="navigation-links">
        <Link
          className={`nav-link-emoji ${activeLink === "emoji" ? "active" : ""}`}
          onClick={() => handleLinkClick("emoji")}
          to="/emojiText"
        >
          Emoji to Text
        </Link>
        <Link
          className={`nav-link-forum ${
            activeLink === "discussion" ? "active" : ""
          }`}
          onClick={() => handleLinkClick("discussion")}
          to="/viewposts"
        >
          Discussion Forum
        </Link>
      </div>

      <div className="profile">
        {user ? (
          <div className="profile-links">
            <Link className="nav-link-view-profile" to="/viewprofile">
              <FaUserCircle className="profile-icon" />
            </Link>
            <Link className="nav-link-logout" onClick={handleLogout}>
              <MdLogout className="logout-icon" />
            </Link>
          </div>
        ) : (
          <div className="profile-links">
            <Link className="nav-link-login" to="/login">
              Log In
            </Link>
            <Link className="nav-link-signup" to="/signup">
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
