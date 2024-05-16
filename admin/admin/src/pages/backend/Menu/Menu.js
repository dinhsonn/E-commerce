import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../../../components/Admin/Sidebar';
import { Link } from "react-router-dom";

const Menu = () => {
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMenus();
  }, []);   

  const fetchMenus = async () => {
    try {
      const response = await axios.get('http://localhost:8384/api/menu');
      setMenus(response.data.content);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching menus:', error);
      setLoading(false);
    }
  };
  const deletemenu = async (id) => {
    try {
      await axios.delete(`http://localhost:8384/api/menu/${id}`);
      fetchMenus();
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="container">
        <div className="py-4">
          <div className="d-flex justify-content-between mb-3">
            <h1 className="display-10">Danh sách menu</h1>
            <Link to="/menu/add-menu" className="btn btn-success">
              Thêm chủ đề
            </Link>
          </div>
          <table className="table bmenu shadow">
            <thead>
              <tr>
                <th scope="col">STT</th>
                <th scope="col">Tên</th>
                <th scope="col">Link</th>
                <th scope="col">kiểu</th>
                <th scope="col">trạng thái</th>
                <th scope="col">vị trí</th>
              </tr>
            </thead>
            <tbody>
              {menus.map((menu, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{menu.name}</td>
                  <td>{menu.link}</td>
                  <td>{menu.type}</td>
                  <td>{menu.status}</td>
                  <td>{menu.position}</td>
                  <td>
                    <Link
                      className="btn btn-primary mx-2"
                      to={`/menu/view-menu/${menu.id}`}
                    >
                      Xem
                    </Link>
                    <Link
                      className="btn btn-outline-primary mx-2"
                      to={`/menu/edit-menu/${menu.id}`}
                    >
                      Sửa
                    </Link>
                    <button
                      className="btn btn-danger mx-2"
                      onClick={() => deletemenu(menu.id)}
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Menu;
