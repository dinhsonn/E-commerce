import React, { useEffect, useState } from 'react';
import CategoryServices from '../../services/CategoryServices';
function Category() {
    const [categories, setCategories] = useState([]);

  useEffect(() => {
    CategoryServices.getAll()
      .then(response => {
        console.log('Data from API:', response.data.content);
        setCategories(response.data.content);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);
    return ( 
        <div className="dropdown category-dropdown">
        <a
          href="#"
          className="dropdown-toggle"
          role="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
          data-display="static"
          title="Browse Categories"
        >
          Danh mục sản phẩm
        </a>
        <div className="dropdown-menu">
          <nav className="side-nav">
            <ul className="menu-vertical sf-arrows">
            {categories.map((category, index) => (
              <li key={index}>
                <a href="#">{category.name}</a>
              </li>
            ))}
            </ul>
            {/* End .menu-vertical */}
          </nav>
          {/* End .side-nav */}
        </div>
        {/* End .dropdown-menu */}
      </div>
     );
}

export default Category;