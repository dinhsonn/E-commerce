import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import Sidebar from "../../../components/Admin/Sidebar";

function Slider() {
  const [sliders, setSliders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [slidersPerPage] = useState(10);

  useEffect(() => {
    loadSliders();
  }, [currentPage]);

  const loadSliders = async () => {
    try {
      const response = await axios.get("http://localhost:8384/api/sliders");
      const updatedSliders = response.data.map((slider) => ({
        ...slider,
        // Nếu bạn muốn sử dụng trường 'name' thì hãy thay đổi thành 'name' thay vì 'position'
        // logo: slider.name + ".png",
        // Một số trường thông tin khác của slider có thể cần được hiển thị ở đây.
      }));
      setSliders(updatedSliders);
    } catch (error) {
      console.error("Error loading sliders:", error);
    }
  };

  const deleteSlider = async (id) => {
    try {
      await axios.delete(`http://localhost:8384/api/sliders/${id}`);
      loadSliders();
    } catch (error) {
      console.error("Error deleting slider:", error);
    }
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastSlider = currentPage * slidersPerPage;
  const indexOfFirstSlider = indexOfLastSlider - slidersPerPage;
  const currentSliders = sliders.slice(indexOfFirstSlider, indexOfLastSlider);

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="container">
        <div className="py-4">
          <div className="d-flex justify-content-between mb-3">
            <h1 className="display-10">Danh sách sliders</h1>
            <Link to="/slider/add-slider" className="btn btn-success">
              Thêm slider
            </Link>
          </div>
          <table className="table border shadow">
            <thead>
              <tr>
                <th scope="col">STT</th>
                <th scope="col">Tên slider</th>
                <th scope="col">Ảnh</th>
                <th scope="col">Mô tả</th>
                <th scope="col">Trạng thái</th>
                <th scope="col">Chức năng</th>
              </tr>
            </thead>
            <tbody>
              {currentSliders.map((slider, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{slider.name}</td>
                  <td>
                    {slider.image && (
                      <img
                        src={`http://localhost:8384/api/sliders/image/${slider.image}`}
                        alt={slider.name}
                        style={{ width: "70px", height: "70px" }}
                      />
                    )}
                    
                  </td>
                  <td>{slider.description}</td>
                  <td>{slider.status}</td>
                  <td>
                    <Link
                      className="btn btn-primary mx-2"
                      to={`/slider/view-slider/${slider.id}`}
                    >
                      Xem
                    </Link>
                    <Link
                      className="btn btn-outline-primary mx-2"
                      to={`/slider/edit-slider/${slider.id}`}
                    >
                      Sửa
                    </Link>
                    <button
                      className="btn btn-danger mx-2"
                      onClick={() => deleteSlider(slider.id)}
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
              {[...Array(Math.ceil(sliders.length / slidersPerPage)).keys()].map((number) => (
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

export default Slider;
