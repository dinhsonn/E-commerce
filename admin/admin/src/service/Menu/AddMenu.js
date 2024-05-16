import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Sidebar from '../../components/Admin/Sidebar';

const AddMenu = () => {
  const [menu, setMenu] = useState({
    name: '',
    link: '',
    parent_id: '',
    type: '',
    status: '',
    position: ''
  });

  const handleChange = (e) => {
    setMenu({ ...menu, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8384/api/menu', menu);
      // Redirect to menu list after successful addition
      window.location.href = '/menu';
    } catch (error) {
      console.error('Error adding menu:', error);
    }
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="container">
        <div className="py-4">
          <h1 className="display-10">Thêm menu mới</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Tên:</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={menu.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Link:</label>
              <input
                type="text"
                className="form-control"
                name="link"
                value={menu.link}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Id của danh mục:</label>
              <input
                type="text"
                className="form-control"
                name="parent_id"
                value={menu.parent_id}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Kiểu:</label>
              <input
                type="text"
                className="form-control"
                name="type"
                value={menu.type}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Trạng thái:</label>
              <input
                type="text"
                className="form-control"
                name="status"
                value={menu.status}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Vị trí:</label>
              <input
                type="text"
                className="form-control"
                name="position"
                value={menu.position}
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">Thêm</button>
            <Link to="/menu" className="btn btn-outline-danger mx-2">Hủy</Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddMenu;
