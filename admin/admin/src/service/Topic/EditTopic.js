import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

import Sidebar from '../../components/Admin/Sidebar';

function EditTopic() {
  const { id } = useParams();
  const [topic, setTopic] = useState({
    name: '',
    slug: '',
    metakey: '',
    metadesc: '',
    status: ''
  });

  useEffect(() => {
    loadTopic();
  }, []);

  const loadTopic = async () => {
    try {
      const response = await axios.get(`http://localhost:8384/api/topics/${id}`);
      setTopic(response.data);
    } catch (error) {
      console.error('Error loading topic:', error);
    }
  };

  const handleChange = (e) => {
    setTopic({ ...topic, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8384/api/topics/${id}`, topic);
      // Redirect to topics list after successful update
      window.location.href = '/topic';
    } catch (error) {
      console.error('Error updating topic:', error);
    }
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="container">
        <div className="py-4">
          <h1 className="display-10">Chỉnh sửa chủ đề</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Tên chủ đề:</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={topic.name}
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
                value={topic.slug}
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
                value={topic.metakey}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Meta Description:</label>
              <input
                type="text"
                className="form-control"
                name="metadesc"
                value={topic.metadesc}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Trạng thái:</label>
              <select
                className="form-select"
                name="status"
                value={topic.status}
                onChange={handleChange}
              >
                <option value="1">Hoạt động</option>
                <option value="0">Ngừng hoạt động</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary">Cập nhật</button>
            <Link to="/topic" className="btn btn-outline-danger mx-2">Hủy</Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditTopic;
