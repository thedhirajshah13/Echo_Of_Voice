import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../Context/authContext";
import axios from "axios";
import "./fullblog.css";

const Fullblog = () => {
  const [fullBlog, setfullBlog] = useState();
  const { auth } = useAuthContext();

  const { id } = useParams();

  useEffect(() => {
    
    const fullBlog = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/fullblog/${id}`
        );
        if (response.status === 200) {
        }

        setfullBlog(response.data.fullBlog);
      } catch (error) {
        console.log(`full Blog Page Error -> ${error}`);
      }
    };
    fullBlog();
  }, [id]);
  

  return (
    <div className="fullblog">
      {fullBlog ? (
        <div className="fullblog-container">
          <image
            src={fullBlog.image}
            alt="Blog Picture"
            className="fullblog-img"
          />
          <h2 className="fullblog-title">{fullBlog.title}</h2>
          <p className="fullblog-categories">{fullBlog.catergories}</p>
          <p className="fullblog-text">{fullBlog.blog}</p>
          {auth.id === fullBlog.user._id ? (
            ""
          ) : (
            <div className="blog-author">
              <p className="author-name">
                Written by: <span>{fullBlog.user.name}</span>
              </p>
              <p className="author-email">
                Email: <span>{fullBlog.user.email}</span>
              </p>
            </div>
          )}
        </div>
      ) : (
        <p>There is some error</p>
      )}
    </div>
  );
};

export default Fullblog;
