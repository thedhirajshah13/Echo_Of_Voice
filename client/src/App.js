import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import BlogPost from "./Pages/BlogPost";
import { AuthContextProvider, useAuthContext } from "./Context/authContext";
import { useState } from "react";
import Login from "./commponent/Login";
import Register from "./commponent/Register";
import Main from "./Pages/Main";
import "./app.css";

function App() {
  const { auth } = useAuthContext();
  console.log(auth);
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<PrivateRoute />} />
          <Route path="/login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route
            path="createpost"
            element={auth ? <BlogPost /> : <Navigate to="/login" />}
          />
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

const PrivateRoute = () => {
  const { auth } = useAuthContext();

  return auth ? <Main /> : <Navigate to="/login" />;
};

export default App;
