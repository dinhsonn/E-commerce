import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Header from "../../../components/Admin/Header";
import Sidebar from "../../../components/Admin/Sidebar";

function Post() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  useEffect(() => {
    loadPosts();
  }, [currentPage]);

  const loadPosts = async () => {
    try {
      const response = await axios.get("http://localhost:8384/api/posts");
      setPosts(response.data.content);
    } catch (error) {
      console.error("Error loading posts:", error);
    }
  };

  const deletePost = async (id) => {
    try {
      await axios.delete(`http://localhost:8384/api/posts/${id}`);
      loadPosts();
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div className="d-flex">
    <Sidebar />
    <div className="container">
      <div className="py-4">
        <h1 className="display-10">Danh sách bài viết</h1>
        <Link to="/post/add-post" className="btn btn-success">
              Thêm chủ đề
            </Link>
        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">STT</th>
              <th scope="col">Tiêu đề</th>
              <th scope="col">Ảnh</th>
              <th scope="col">Nội dung</th>
              <th scope="col">Loại</th>
              <th scope="col">Chức năng</th>
            </tr>
          </thead>
          <tbody>
            {currentPosts.map((post, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{post.title}</td>
                <td>
                    {post.image && (
                      <img
                        src={`http://localhost:8384/api/brand/image/${post.image}`}
                        alt={post.name}
                        style={{ width: "70px", height: "70px" }}
                      />
                    )}
                  </td>
                <td>{post.detail}</td>
                <td>{post.topicId.name}</td>
                <td>
                <Link
                      className="btn btn-primary mx-2"
                      to={`/post/view-post/${post.id}`}
                    >
                      Xem
                    </Link>
                    <Link
                      className="btn btn-outline-primary mx-2"
                      to={`/post/edit-post/${post.id}`}
                    >
                      Sửa
                    </Link>
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => deletePost(post.id)}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <nav>
          <ul className="pagination">
            {[...Array(Math.ceil(posts.length / postsPerPage)).keys()].map((number) => (
              <li key={number + 1} className="page-item">
                <button
                  className="page-link"
                  onClick={() => paginate(number + 1)}
                >
                  {number + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
    </div>

  );
}

export default Post;
