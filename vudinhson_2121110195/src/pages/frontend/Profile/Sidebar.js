import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { faUser, faShoppingBag, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Sidebar = () => {
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
    <div className="sidebar">
      <h2>{userDetails?.username || ''}</h2>
      <ul>
        <li>
          <Link to="/profile">
            <FontAwesomeIcon icon={faUser} />
            <span>Tài khoản của tôi</span>
          </Link>
        </li>
        <li>
          <Link to="/edit">
            <FontAwesomeIcon icon={faEdit} />
            <span>Sửa Hồ Sơ</span>
          </Link>
        </li>
        <li>
          <Link to="/order">
            <FontAwesomeIcon icon={faShoppingBag} />
            <span>Đơn hàng</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
