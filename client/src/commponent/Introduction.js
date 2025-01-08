import React from "react";
import "./introduction.css";



const Introduction = () => {
  return (
    <div class="main_intro">
  <video class="section-video" autoPlay muted loop>
    <source src="https://video.wixstatic.com/video/375882_9f1a8e8b364946f38b7eb05436e76503/1080p/mp4/file.mp4" type="video/mp4"/>
    Your browser does not support the video tag.
  </video>
  <h1>Welcome to My Page</h1>
</div>

  );
};

export default Introduction;
