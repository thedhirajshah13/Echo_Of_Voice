import React from "react";
import Navbar from "../commponent/Navbar";
import Introduction from "../commponent/Introduction";
import Categories from "../commponent/Categories";
import BlogSection from "../commponent/BlogSection";
const Main = () => {
  return (
    <>
      <Navbar/>
      <Introduction/>
      <div style={{display:'grid' , gridTemplateColumns:'30% 70%'}}>
      <Categories/>
      <BlogSection/>
      </div>
      
    </>
  );
};

export default Main;
