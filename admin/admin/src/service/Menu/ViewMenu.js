import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Sidebar from '../../components/Admin/Sidebar';

const ViewMenu = () => {
  const { id } = useParams();
  const [menu, setMenu] = useState({
    name: '',
    link: '',
    parent_id: '',
    type: '',
    status: '',
    position: ''
  });

  useEffect(() => {
    loadMenu();
  }, []);

  const loadMenu = async () => {
    try {
      const response = await axios.get(`http://localhost:8384/api/menu/${id}`);
      setMenu(response.data);
    } catch (error) {
      console.error('Error loading menu:', error);
    }
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="container">
        <div className="py-4">
          <h1 className="display-10">Xem menu</h1>
          <ul className="list-group w-50">
            <li className="list-group-item">Tên: {menu.name}</li>
            <li className="list-group-item">Link: {menu.link}</li>
            <li className="list-group-item">Id của danh mục: {menu.parent_id}</li>
            <li className="list-group-item">Kiểu: {menu.type}</li>
            <li className="list-group-item">Trạng thái: {menu.status}</li>
            <li className="list-group-item">Vị trí: {menu.position}</li>
          </ul>
          <Link to="/menu" className="btn btn-primary mt-3">Quay lại</Link>
        </div>
      </div>
    </div>
  );
};

export default ViewMenu;
