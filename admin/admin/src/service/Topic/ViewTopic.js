import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

import Sidebar from '../../components/Admin/Sidebar';

function ViewTopic() {
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

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="container">
        <div className="py-4">
          <h1 className="display-10">Xem chủ đề</h1>
          <ul className="list-group w-50">
            <li className="list-group-item">Tên chủ đề: {topic.name}</li>
            <li className="list-group-item">Slug: {topic.slug}</li>
            <li className="list-group-item">Meta Key: {topic.metakey}</li>
            <li className="list-group-item">Meta Description: {topic.metadesc}</li>
            <li className="list-group-item">Trạng thái: {topic.status}</li>
          </ul>
          <Link to="/topic" className="btn btn-primary mt-3">Quay lại</Link>
        </div>
      </div>
    </div>
  );
}

export default ViewTopic;
