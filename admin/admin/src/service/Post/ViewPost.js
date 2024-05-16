import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import Sidebar from "../../components/Admin/Sidebar";

function ViewPost() {
  const { id } = useParams();

  const [post, setPost] = useState({
    title: "",
    content: "",
    author: "",
    date: "",
  });

  useEffect(() => {
    loadPost();
  }, []);

  const loadPost = async () => {
    try {
      const response = await axios.get(`http://localhost:8384/api/posts/${id}`);
      setPost(response.data);
    } catch (error) {
      console.error("Error loading post:", error);
    }
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="container mt-5">
        <h1>View Post</h1>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Title: {post.title}</h5>
            <p className="card-text">Nội dung: {post.detail}</p>
            <p className="card-text">Ảnh:  <img
                        src={`http://localhost:8384/api/brand/image/${post.image}`}
                        alt={post.name}
                        style={{ width: "70px", height: "70px" }}
                      />    </p>
            <p className="card-text">Type: {post.type}</p>
            <Link className="btn btn-primary" to={`/editpost/${id}`}>
              Edit
            </Link>
            <Link className="btn btn-outline-danger mx-2" to="/post">
              Back to List
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewPost;
