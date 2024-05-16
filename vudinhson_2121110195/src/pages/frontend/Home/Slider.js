import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Slider() {
  const [sliderData, setSliderData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8384/api/sliders');
        const sortedData = response.data.sort((a, b) => a.sortOrder - b.sortOrder);
        setSliderData(sortedData);
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu từ API:', error);
      }
    };

    fetchData();
  }, []);


  return (
    <div className="intro-slider-container">
      <div
        className="owl-carousel owl-simple owl-light owl-nav-inside"
        data-toggle="owl"
        data-owl-options='{"nav": false}'
      >
        {sliderData.slice(0, 1).map((item) => (
          <div
            key={item.id}
            className="intro-slide"
            style={{
              backgroundImage: `url(http://localhost:8384/api/sliders/image/${item.image})`
            }}
          >
            <div className="container intro-content">
              <h1 className="intro-title">
                {item.name}
              </h1>
            </div>
          </div>
        ))}
      </div>
      <span className="slider-loader text-white" />
    </div>
  );
}

export default Slider;
