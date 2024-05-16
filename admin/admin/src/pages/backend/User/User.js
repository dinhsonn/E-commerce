import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import Sidebar from "../../../components/Admin/Sidebar";

function User() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);

  useEffect(() => {
    loadUsers();
  }, [currentPage]);

  const loadUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8384/api/users");
      setUsers(response.data.content);
    } catch (error) {
      console.error("Error loading users:", error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:8384/api/users/${id}`);
      loadUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="container">
        <div className="py-4">
          <div className="d-flex justify-content-between mb-3">
            <h1 className="display-10">Danh sách người dùng</h1>
            <Link to="/user/add-user" className="btn btn-success">
              Thêm người dùng
            </Link>
          </div>
          <table className="table border shadow">
            <thead>
              <tr>
                <th scope="col">STT</th>
                <th scope="col">Tên người dùng</th>
                <th scope="col">Email</th>
                <th scope="col">Số điện thoại</th>
                <th scope="col">Username</th>
                <th scope="col">Mật khẩu</th>
                <th scope="col">Địa chỉ</th>
                <th scope="col">Hình ảnh</th>
                <th scope="col">Roles</th>
                <th scope="col">Trạng thái</th>
                <th scope="col">Chức năng</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.username}</td>
                  <td>{user.password}</td>
                  <td>{user.address}</td>

                  <td>
                    {user.image && (
                      <img
                        src={`http://localhost:8384/api/users/image/${user.image}`}
                        alt={user.name}
                        style={{ width: "70px", height: "70px" }}
                      />
                    )}
                  </td>
                  <td>{user.roles}</td>
                  <td>{user.status}</td>
                  <td>
                    <Link
                      className="btn btn-primary mx-2"
                      to={`/user/view-user/${user.id}`}
                    >
                      Xem
                    </Link>
                    <Link
                      className="btn btn-outline-primary mx-2"
                      to={`/user/edit-user/${user.id}`}
                    >
                      Sửa
                    </Link>
                    <button
                      className="btn btn-danger mx-2"
                      onClick={() => deleteUser(user.id)}
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
              {[...Array(Math.ceil(users.length / usersPerPage)).keys()].map((number) => (
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

export default User;
