import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useBlogContentContext } from "../Context/blogContentContext";
import axios from "axios";

const Fullblog = () => {
  const { fullBlog, setfullBlog } = useBlogContentContext();
  const { id } = useParams();
  console.log(id)
  useEffect(() => {
    const fullBlog = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/fullblog/${id}`
        );
        if (response.status === 200) {
        }
        console.log(response.data);
        setfullBlog(response.data);
      } catch (error) {
        console.log(`full Blog Page Error -> ${error}`);
      }
    };
    fullBlog();
  }, [id]);
  console.log(fullBlog);

  return <div>Faxxy</div>;
};

export default Fullblog;
