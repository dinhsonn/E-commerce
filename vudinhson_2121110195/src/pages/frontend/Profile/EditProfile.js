import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './profile.css';
import Header from '../../../components/Public/Header';
import Footer from '../../../components/Public/Footer';
import Sidebar from './Sidebar';
import axios from 'axios';

const EditProfile = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [editedUser, setEditedUser] = useState(null);
  const [editedEmail, setEditedEmail] = useState(null);

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem('loggedInUser'))?.id;

    if (userId) {
      axios.get(`http://localhost:8384/api/users/${userId}`)
        .then(response => {
          setUserDetails(response.data);
          setEditedUser({ ...response.data });
        })
        .catch(error => {
          console.error('Lỗi khi lấy thông tin người dùng:', error);
        });
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    axios.put(`http://localhost:8384/api/users/${editedUser.id}`, editedUser)
      .then(response => {
        console.log('Cập nhật thành công:', response.data);
        toast.success('Cập nhật thông tin thành công!');
      })
      .catch(error => {
        console.error('Lỗi khi cập nhật thông tin người dùng:', error);
        toast.error('Lỗi khi cập nhật thông tin. Vui lòng thử lại.');
      });
  };

  return (
    <>
      <Header />
      <div className="profile-container">
        <Sidebar />
        <div className="col-lg-6">
          <div className="profile-header">
            <h2>Chỉnh sửa thông tin tài khoản</h2>
          </div>
          <form className="contact-form mb-3" onSubmit={handleFormSubmit}>
            <div className="row">
              <div className="col-sm-12">
                <label htmlFor="username">Tên đăng nhập:</label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  value={editedUser?.username || ''}
                  readOnly
                />
              </div>
              <div className="col-sm-6">
                <label htmlFor="name">Tên tài khoản:</label>
                <input
                  className="form-control"
                  type="text"
                  id="name"
                  name="name"
                  value={editedUser?.name || ''}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-sm-6">
                <label htmlFor="email">Email:</label>
                <input
                  className="form-control"
                  type="text"
                  id="email"
                  name="email"
                  value={editedUser?.email || ''}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-sm-6">
                <label htmlFor="phone">Số điện thoại:</label>
                <input
                  className="form-control"
                  type="text"
                  id="phone"
                  name="phone"
                  value={editedUser?.phone || ''}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-sm-12">
                <label htmlFor="address">Địa chỉ:</label>
                <input
                  className="form-control"
                  type="text"
                  id="address"
                  name="address"
                  value={editedUser?.address || ''}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-sm-12">
                <label htmlFor="password">Mật khẩu:</label>
                <input
                  className="form-control"
                  type="password"
                  id="password"
                  name="password"
                  value={editedUser?.password || ''}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-sm-12">
                <button type="submit" className="btn btn-primary">
                  Lưu thay đổi
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="image"></div>
      </div>
      <Footer />
      <ToastContainer />
    </>
  );
};

export default EditProfile;
