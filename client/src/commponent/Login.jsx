import React, { useContext, useState } from "react";
import logo from "../asset/logo.png";
import "./login.css";
import { Button } from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../Context/authContext";

const Login = () => {
  const { setAuth } = useAuthContext();
  const [login, setlogin] = useState({
    email: "",
    password: "",
  });
  const [error, seterror] = useState("");

  const Naviagte = useNavigate();
  function handleChange(e) {
    setlogin({ ...login, [e.target.name]: e.target.value });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    // posting request to backend..
    try {
      const url = "http://localhost:8000/login";
      const response = await axios.post(url, JSON.stringify(login), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      console.log(response);
      const result = response.data;

      localStorage.setItem("blog-user", JSON.stringify(result));
      setAuth(result);
      Naviagte("/");
    } catch (error) {
      console.log(`client->login Error ${error}`)
    }
  }

  return (
    <div className="login">
      <img src={logo} alt={logo} />
      <form action="/" method="POST" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          value={login.email}
          onChange={handleChange}
          required
          placeholder="Enter your Email-Id...."
        />
        <input
          type="password"
          name="password"
          value={login.password}
          onChange={handleChange}
          required
          placeholder="Password..."
        />
        <br />
        <button type="submit" className="login-btn">
          Login
        </button>
      </form>

      <div>
        <p>New User?</p>
        <Link to="/register">
          <Button variant="outlined">Create new Account</Button>
        </Link>
      </div>
    </div>
  );
};

export default Login;
