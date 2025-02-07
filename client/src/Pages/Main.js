import React from "react";
import Navbar from "../commponent/Navbar";
import Introduction from "../commponent/Introduction";
import Categories from "../commponent/Categories";
import BlogSection from "../commponent/BlogSection";
import Footer from "../commponent/Footer";
const Main = () => {
  return (
    <>
      <Navbar/>
      <Introduction/>
      
      <div style={{ width:"60%", display:"flex",margin:"1% 10% 1% 10%", padding:"1% 10% 1% 10%"}}>
      <BlogSection/>
      </div>
      <Footer/>
      
      
    </>
  );
};

export default Main;
