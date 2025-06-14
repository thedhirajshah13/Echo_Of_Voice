import React from "react";
// import Logo from "../asset/logo.png";
import Logo from "../asset/Icon.webp";
import "./navbar.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuthContext } from "../Context/authContext";
import HomeIcon from "@mui/icons-material/Home";
import CreateIcon from '@mui/icons-material/Create';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import InfoIcon from '@mui/icons-material/Info';
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
        <span>Echo Of Voice</span>
      </div>
      <div className="visiting_links">
        <Link to="/">{<HomeIcon />}Home</Link>
        <Link to="/about"><InfoIcon/>About</Link>
        <Link to="/contact">{<ContactMailIcon/>}Contact</Link>
        <Link to='/createpost'>{<CreateIcon/>}Share</Link>
      </div>
      <div className="userInfo">
        {/* <button >{<CreateIcon/>}Blog</button> */}
        <button onClick={logout}>{<LogoutIcon />}</button>
      </div>
    </div>
  );
};

export default Navbar;
