import React, { useState } from "react";
import "./login.css";
import logo from "../asset/logo.png";
import "./login.css";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuthContext } from "../Context/authContext";

const Register = () => {
  const { setAuth } = useAuthContext();
  const [input, setinput] = useState({
    name: "",
    email: "",
    password: "",
  });
  const Navigate = useNavigate();
  function handleChange(e) {
    setinput({ ...input, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const url = "http://localhost:8000/register";
      const response = await axios.post(url, input, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      const result = response;
      console.log(result);
      if (result.status === 201) {
        setTimeout(() => {
          localStorage.setItem("blog-user", JSON.stringify(result.data));
          setAuth(result);
          setinput("");
          Navigate("/login");
        }, 1000);
      }
    } catch (error) {
      console.log(`register issue ${error}`);
    }
  }
  return (
    <div className="login">
      <img
        src={logo}
        alt={logo}
        style={{
          height: "100px",
          width: "80%",
          display: "flex",
          margin: "auto",
        }}
      />
      <form action="/register" method="post" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={input.name}
          placeholder="Enter Your Name"
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          value={input.email}
          placeholder="Enter your Email-Id...."
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          value={input.password}
          placeholder="Password..."
          onChange={handleChange}
        />

        <br />
        <button type="submit" className="login-btn">
          Sign-Up
        </button>
      </form>

      <div>
        <p>Already have account?</p>
        <Link to="/">
          <Button variant="outlined">Login</Button>
        </Link>
      </div>
    </div>
  );
};

export default Register;
