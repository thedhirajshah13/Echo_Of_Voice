import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./blogsection.css";


const BlogSection = () => {
  const [post, setpost] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 3;
  const page = Array.from({ length: totalPage }, (_, index) => index + 1);

  useEffect(() => {
    const getpost = async () => {
      const response = await axios.get(
        `http://localhost:8000/post?page=${currentPage}&limit=${limit}`,
        {
          withCredentials: true,
        }
      );
      const { posts, totalPages, currentpage } = response.data;
      setCurrentPage(currentpage);
      setTotalPage(totalPages);
      
      setpost(posts);
    };
    getpost();
  }, [currentPage]);
  function handleNextPage() {
    if (currentPage < totalPage) setCurrentPage(currentPage + 1);
  }
  function handlePrevPage() {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  }

  return (
    <div className="blogsection">
      {post.length > 0 ? (
        post.map((post, index) => (
          <div className="postCard" key={index}>
            <img
              src={
                post.image ||
                "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2"
              }
              onError={(e) => {
                e.target.src =
                  "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2"; // Default image URL
              }}
              alt="blog-img"
            />
            <h4>{post.title}</h4>
            <p>
              {post.blog.substring(0, 150)}{" "}
              <Link to={`fullblog/${post._id}`}>
                click here to read full blog...
              </Link>
            </p>
          </div>
        ))
      ) : (
        <p>hello</p>
      )}
      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
          {page.map((page, index) => (
            <button
              style={
                index + 1 === currentPage
                  ? {
                      background: "red",
                      marginTop: "4%",
                      width: "20%",
                      height: "40%",
                      border: "1px solid black",
                      borderRadius: "50%",
                      textAlign: "center",
                    }
                  : {
                      width: "20%",
                      height: "40%",
                      marginTop: "4%",
                      border: "1px solid black",
                      borderRadius: "50%",
                      textAlign: "center",
                    }
              }
              className="pageNumber"
              onClick={() => setCurrentPage(index + 1)}
            >
              {page}
            </button>
          ))}
        </div>

        <button onClick={handleNextPage} disabled={currentPage === totalPage}>
          Next
        </button>
      </div>
    </div>
  );
};

export default BlogSection;
