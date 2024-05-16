import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import MenuServices from '../../services/MenuServices';
function Menu() {
  
  const [menus, setMenus] = useState([]);
  
  useEffect(() => {
    MenuServices.getAll()
      .then(response => {
        setMenus(response.data.content);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);
   const renderSubMenu = parentMenu => {
    const subMenus = menus.filter(menu => menu.parent && menu.parent.id === parentMenu.id);

    if (subMenus.length === 0) {
      return null;
    }

    return (
      <ul>
        {subMenus.map((submenu, index) => (
          <li key={index}>
            <Link to={submenu.link} className="sf-with-ul">
              {submenu.name}
            </Link>
            {renderSubMenu(submenu)}
          </li>
        ))}
      </ul>
    );
  };
  
  
    return (  
        <>
         <div className="header-center">
            <nav className="main-nav">
              <ul className="menu sf-arrows">
              {menus
            .filter(menu => menu.parent && menu.parent.id === 1) 
            .map((menu, index) => (
                <li key={index}>
                  <Link to={menu.link} className="sf-with-ul">
                    {menu.name}
                  </Link>
                  {renderSubMenu(menu)}
                </li>
              ))}
              </ul>
            </nav>
          </div>
        </>
    );
}

export default Menu;