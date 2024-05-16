import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Admin/Sidebar";

function AddPost() {
  const navigate = useNavigate();

  const [post, setPost] = useState({
    topicId: {
        id: "",
      },
    name: "",
    title: "",
    detail: "",
    slug: "",
    type: "",
    metakey: "",
    metadesc: "",
    status: 1,
    createdBy: "admin",
  });

  const [newImage, setNewImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost((prevPost) => ({
      ...prevPost,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (newImage) {
        const imageFormData = new FormData();
        imageFormData.append("file", newImage);
        imageFormData.append("customName", post.name);

        const imageResponse = await axios.post(
          "http://localhost:8384/api/posts/image",
          imageFormData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (imageResponse.status === 200) {
          setPost((prevPost) => ({
            ...prevPost,
            image: post.name,
          }));
        }
      }

      await axios.post(`http://localhost:8384/api/posts`, post);
      navigate("/post");
    } catch (error) {
      console.error("Error adding post:", error);
    }
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="container mt-5">
        <h1>Add Post</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Topic ID:</label>
            <input
              type="text"
              className="form-control"
              name="topicId"
              value={post.topicId.id}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Title:</label>
            <input
              type="text"
              className="form-control"
              name="title"
              value={post.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Slug:</label>
            <input
              type="text"
              className="form-control"
              name="slug"
              value={post.slug}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Detail:</label>
            <textarea
              className="form-control"
              name="detail"
              value={post.detail}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Meta Key:</label>
            <input
              type="text"
              className="form-control"
              name="metakey"
              value={post.metakey}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Meta Description:</label>
            <textarea
              className="form-control"
              name="metadesc"
              value={post.metadesc}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">Tên ảnh</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={post.name}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="newImage">Ảnh mới</label>
            <input
              type="file"
              className="form-control"
              id="newImage"
              name="newImage"
              onChange={handleImageChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Add Post
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddPost;
