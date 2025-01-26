import React from "react";
import Logo from "../asset/logo.png";
import "./navbar.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuthContext } from "../Context/authContext";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";

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
        <img src={Logo} alt="logo" />
      </div>
      <div className="visiting_links">
        <Link to="/">{<HomeIcon />}Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </div>
      <div className="userInfo">
        <button onClick={logout}>{<LogoutIcon />}</button>
      </div>
    </div>
  );
};

export default Navbar;
