import React from "react";
import Navbar from "../commponent/Navbar";
import Introduction from "../commponent/Introduction";
import Categories from "../commponent/Categories";
import BlogSection from "../commponent/BlogSection";
import Footer from "../commponent/Footer";

const Main = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />
      <Introduction />
      <div
        style={{
          width: "60%",
          display: "flex",
          margin: "1% 10% 1% 10%",
          padding: "1% 10% 1% 10%",
          flex: 1,  // Allow the BlogSection to take up the available space
        }}
      >
        <BlogSection />
      </div>
      <Footer />
    </div>
  );
};

export default Main;
