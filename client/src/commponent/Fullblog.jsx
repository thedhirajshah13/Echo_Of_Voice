import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../Context/authContext";
import SendIcon from '@mui/icons-material/Send';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import axios from "axios";
import "./fullblog.css";

const Fullblog = () => {
  const [fullBlog, setfullBlog] = useState();
  const [comment,setComment]=useState();
  const { auth } = useAuthContext();

  const { id } = useParams();
  // console.log(id);

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

  const handleComment=(e)=>{
    setComment(e.target.value);
    console.log(comment)
  }
  // const handleCommentSubmit=async()=>{
  //   try {
  //     const url="http://localhost:8000/fullblog/comments"

  //     const response =await axios.post(url,JSON.stringify(comment),{
  //       method:"POST",
  //       withcredential:true,

  //       Headers:{
  //         content:"application/json"
  //       }
  //     })
  //   } catch (error) {
      
  //   }
  // }
  

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
                <span>{<ThumbUpAltIcon/>}</span>
                
                <input type="text" placeholder="Add a comment..." onChange={handleComment} value={comment} />
                <button>{<SendIcon/>}</button>
              </div>
            </>
          )}
          <div className="comment">
            <h3>{fullBlog.comments.length} Comments</h3>
            {
              fullBlog.comments.length>0?<div className="comment-section">
                {
                  fullBlog.comments.map((comm)=>(
                    <div className="comment-card">
                      <p>{comm.message}</p>
                      <h4>{comm.user.name}</h4>
                    </div>
                  ))
                }
              </div>

              :""
            }
          </div>
        </div>
      ) : (
        <p>There is some error</p>
      )}
    </div>
  );
};

export default Fullblog;
