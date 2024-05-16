import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import Sidebar from "../../../components/Admin/Sidebar";

function Topic() {
  const [topics, setTopics] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [topicsPerPage] = useState(10);

  useEffect(() => {
    loadTopics();
  }, [currentPage]);

  const loadTopics = async () => {
    try {
      const response = await axios.get("http://localhost:8384/api/topics");
      setTopics(response.data.content);
    } catch (error) {
      console.error("Error loading topics:", error);
    }
  };

  const deleteTopic = async (id) => {
    try {
      await axios.delete(`http://localhost:8384/api/topics/${id}`);
      loadTopics();
    } catch (error) {
      console.error("Error deleting topic:", error);
    }
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastTopic = currentPage * topicsPerPage;
  const indexOfFirstTopic = indexOfLastTopic - topicsPerPage;
  const currentTopics = topics.slice(indexOfFirstTopic, indexOfLastTopic);

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="container">
        <div className="py-4">
          <div className="d-flex justify-content-between mb-3">
            <h1 className="display-10">Danh sách chủ đề</h1>
            <Link to="/topic/add-topic" className="btn btn-success">
              Thêm chủ đề
            </Link>
          </div>
          <table className="table border shadow">
            <thead>
              <tr>
                <th scope="col">STT</th>
                <th scope="col">Tên chủ đề</th>
                <th scope="col">slug</th>
                <th scope="col">metakey</th>
                <th scope="col">metadesc</th>
                <th scope="col">Ngày tạo</th>
                <th scope="col">status</th>
                <th scope="col">Chức năng</th>

              </tr>
            </thead>
            <tbody>
              {currentTopics.map((topic, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{topic.name}</td>
                <td>{topic.slug}</td>
                <td>{topic.metakey}</td>
                <td>{topic.metadesc}</td>
                <td>{topic.createdAt}</td>
                <td>{topic.status}</td>
                  <td>
                    <Link
                      className="btn btn-primary mx-2"
                      to={`/topic/view-topic/${topic.id}`}
                    >
                      Xem
                    </Link>
                    <Link
                      className="btn btn-outline-primary mx-2"
                      to={`/topic/edit-topic/${topic.id}`}
                    >
                      Sửa
                    </Link>
                    <button
                      className="btn btn-danger mx-2"
                      onClick={() => deleteTopic(topic.id)}
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
              {[...Array(Math.ceil(topics.length / topicsPerPage)).keys()].map((number) => (
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

export default Topic;
