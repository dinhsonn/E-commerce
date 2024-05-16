import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

function ViewUser() {
  const { id } = useParams();
  const [user, setUser] = useState({});

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const response = await axios.get(`http://localhost:8384/api/users/${id}`);
      setUser(response.data);
    } catch (error) {
      console.error("Error loading user:", error);
    }
  };

  return (
    <div className="container">
      <div className="py-4">
        <h1 className="display-4">Thông tin người dùng</h1>
        <ul>
          <li>Tên người dùng: {user.name}</li>
          <li>Email: {user.email}</li>
          <li>Số điện thoại: {user.phone}</li>
          <li>Username: {user.username}</li>
          <li>Địa chỉ: {user.address}</li>
          <li>Roles: {user.roles}</li>
          <li>Trạng thái: {user.status}</li>
          {user.image && (
            <li>
              Hình ảnh:{" "}
              <img
                src={`http://localhost:8384/api/users/image/${user.image}`}
                alt={user.name}
                style={{ width: "70px", height: "70px" }}
              />
            </li>
          )}
        </ul>
        <Link className="btn btn-outline-primary mx-2" to="/user">
          Quay lại
        </Link>
      </div>
    </div>
  );
}

export default ViewUser;
