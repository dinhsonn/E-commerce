import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../components/Admin/Sidebar";

function EditPost() {
  const navigate = useNavigate();
  const { id } = useParams();

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
  });
  const [newImage, setNewImage] = useState(null);
  const [oldImageName, setOldImageName] = useState("");

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8384/api/posts/${id}`);
        setPost(response.data);
      } catch (error) {
        console.error("Error fetching post details:", error);
      }
    };

    fetchPostDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    if (name === "name") {
      setPost((prevBrand) => ({
        ...prevBrand,
        [name]: value,
        image: value + ".png", // Chỉ cập nhật ảnh dựa trên tên khi tên thay đổi
      }));
  
      if (newImage) {
        setNewImage(null); // Reset ảnh mới nếu người dùng thay đổi tên
      }
    } else {
        setPost((prevBrand) => ({
        ...prevBrand,
        [name]: value,
      }));
    }
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
            setPost((prevBrand) => ({
              ...prevBrand,
              image: post.name,
            }));
            setOldImageName(post.name + ".png");

          }
        }

        await axios.put(`http://localhost:8384/api/posts/${id}`, post);
        navigate("/post");
      } catch (error) {
        console.error("Error updating brand:", error);
      }
    };


  return (
    <div className="d-flex">
      <Sidebar />
      <div className="container mt-5">
        <h1>Edit Post</h1>
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
          <div className="form-group">
            <label htmlFor="image">Ảnh</label>
            <input
              type="text"
              className="form-control"
              id="image"
              name="image"
              value={post.image}
              readOnly
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Update Post
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditPost;
