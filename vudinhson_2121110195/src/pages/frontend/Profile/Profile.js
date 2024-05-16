import React, { useEffect, useState } from 'react';
import './profile.css';
import Header from '../../../components/Public/Header';
import Footer from '../../../components/Public/Footer';
import Sidebar from './Sidebar';

const Profile = () => {
  // Sử dụng state để lưu thông tin người dùng
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    // Kiểm tra nếu có thông tin người dùng trong localStorage
    const storedUser = localStorage.getItem('loggedInUser');

    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserDetails(user);
    }
  }, []);

  return (
    <>
      <Header />
      <div className="profile-container">
        <Sidebar />
        <div className="col-lg-6">
          <div className="profile-header">
            <h2>Thông tin tài khoản</h2>
          </div>
          <form className="contact-form mb-3">
            <div className="row">
              <div className="col-sm-12">
                <label htmlFor="name">Tên đăng nhập:</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={userDetails?.username || ''}
                  readOnly
                />
              </div>
              <div className="col-sm-6">
                <label htmlFor="name">Tên tài khoản:</label>
                <input
                  className="form-control"
                  type="text"
                  id="name"
                  value={userDetails?.name || ''}
                  readOnly
                />
              </div>
              <div className="col-sm-6">
                <label htmlFor="email">Email:</label>
                <input
                  className="form-control"
                  type="text"
                  id="email"
                  value={userDetails?.email || ''}
                  readOnly
                />
              </div>
              <div className="col-sm-6">
                <label htmlFor="cphone">Số điện thoại:</label>
                <input
                  className="form-control"
                  type="text"
                  id="cphone"
                  value={userDetails?.phone || ''}
                  readOnly
                />
              </div>
              <div className="col-sm-6">
                <label htmlFor="address">Địa chỉ:</label>
                <input
                  className="form-control"
                  type="text"
                  id="address"
                  value={userDetails?.address || ''}
                  readOnly
                />
              </div>
            </div>
          </form>
        </div>
        <div className="image"></div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
