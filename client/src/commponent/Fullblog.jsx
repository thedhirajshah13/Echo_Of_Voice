import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../Context/authContext";
import SendIcon from "@mui/icons-material/Send";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import axios from "axios";
import "./fullblog.css";
import useListenCommentAndLike from "../socketHooks";
import { useSocketContext } from "../Context/socketContext";

const Fullblog = () => {
  const { socket } = useSocketContext();
  const [fullBlog, setfullBlog] = useState();
  const [comment, setComment] = useState();
  const { auth } = useAuthContext();
  console.log(auth.id);

  const { id } = useParams();
  useListenCommentAndLike(setfullBlog);
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

  const handleComment = (e) => {
    setComment(e.target.value);
    
  };
  const handleCommentSubmit = async () => {
    try {
      const url = "http://localhost:8000/fullblog/comments";
      const commentData = {
        message: comment,
        blog: id,
      };

      const response = await axios.post(url, commentData, {
        method: "POST",
        withCredentials: true,

        headers: {
          content: "application/json",
        },
      });
      console.log(response);
      socket.emit("newComment", { message: comment, blog: id, user: auth });
      setComment("");
    } catch (error) {
      console.log(`Comment Error-> ${error}`);
    }
  };
  const handleLikeSubmit = async () => {
    try {
      const url = "http://localhost:8000/fullblog/like";
      const response = await axios.post(
        url,
        { blog: id },
        {
          method: "post",
          withCredentials: true,
          headers: {
            content: "application/json",
          },
        }
      );
      const result = response.data;
      socket.emit("newLike", { blog: id, user: auth });
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(fullBlog);
  const likesArray = Array.isArray(fullBlog?.like) ? fullBlog.like : ""; 

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
            <>
              <div className="blog-author">
                <p className="author-name">
                  Written by: <span>{fullBlog.user.name}</span>
                </p>
                <p className="author-email">
                  Email: <span>{fullBlog.user.email}</span>
                </p>
              </div>
              <div className="blog-interaction">
                <span
                  style={
                    likesArray.some((like) => like.user?._id === auth?.id)
                      ? { color: "blue" }
                      : {}
                  }
                >
                  {likesArray.length} 
                  <ThumbUpAltIcon
                    onClick={handleLikeSubmit}
                    style={{
                      cursor: likesArray.some(
                        (like) => like.user?._id === auth?.id
                      )
                        ? "not-allowed"
                        : "pointer",
                      color: likesArray.some(
                        (like) => like.user?._id === auth?.id
                      )
                        ? "blue"
                        : "gray",
                    }}
                    
                    disabled={likesArray.some(
                      (like) => like.user?._id === auth?.id
                    )}
                  />
                </span>

                <input
                  type="text"
                  placeholder="Add a comment..."
                  onChange={handleComment}
                  value={comment}
                />
                <button onClick={handleCommentSubmit}>{<SendIcon />}</button>
              </div>
            </>
          )}
          <div className="comment">
            <h3>{fullBlog.comments.length} Comments</h3>
            {fullBlog.comments.length > 0 ? (
              <div className="comment-section">
                {fullBlog.comments.map((comm) => (
                  <div className="comment-card">
                    <p>{comm.message}</p>
                    <h4>{comm.user.name}</h4>
                  </div>
                ))}
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      ) : (
        <p>There is some error</p>
      )}
    </div>
  );
};

export default Fullblog;
