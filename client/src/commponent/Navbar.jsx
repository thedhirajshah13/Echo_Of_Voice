import React from "react";
import Logo from "../asset/logo.png";
import "./navbar.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuthContext } from "../Context/authContext";

const Navbar = () => {
  const { setAuth } = useAuthContext();
  function logout() {
    const url = "http://localhost:8000/logout";
    const response = axios.post(url, {
      withCredentials: true,
    });

    if (response) {
      localStorage.setItem("blog-user", "");
      setAuth("");
    }
  }
  return (
    <div className="navbar">
      <div>
        <img src={Logo} />
      </div>
      <div className="visiting_links">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </div>
      <div className="userInfo">
        <p>Composs</p>
        <button style={{ width: "10px", height: "10px" }} onClick={logout}>
          LogOut
        </button>
      </div>
    </div>
  );
};

export default Navbar;
