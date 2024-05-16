function Sidebar() {
    return ( 
        <div
  className="page-wrapper"
  id="main-wrapper"
  data-layout="vertical"
  data-navbarbg="skin6"
  data-sidebartype="full"
  data-sidebar-position="fixed"
  data-header-position="fixed"
>
  <aside className="left-sidebar">
    <div>
      <div className="brand-logo d-flex align-items-center justify-content-between">
        <a href="" className="text-nowrap logo-img">
          <img src="../assets/images/logos/dark-logo.svg" width={180} alt="" />
        </a>
        <div
          className="close-btn d-xl-none d-block sidebartoggler cursor-pointer"
          id="sidebarCollapse"
        >
          <i className="ti ti-x fs-8" />
        </div>
      </div>
      {/* Sidebar navigation*/}
      <nav className="sidebar-nav scroll-sidebar" data-simplebar="">
        <ul id="sidebarnav">
          <li className="nav-small-cap">
            <i className="ti ti-dots nav-small-cap-icon fs-4" />
          </li>
          <li className="sidebar-item">
            <a
              className="sidebar-link"
              href=""
              aria-expanded="false"
            >
              <span>
                <i className="ti ti-layout-dashboard" />
              </span>
              <span className="hide-menu">Trang Chủ</span>
            </a>
          </li>
          <li className="nav-small-cap">
            <i className="ti ti-dots nav-small-cap-icon fs-4" />
            <span className="hide-menu">Danh mục</span>
          </li>
          <li className="sidebar-item">
            <a
              className="sidebar-link"
              href="/product"
              aria-expanded="false"
            >
              <span>
                <i className="ti ti-article" />
              </span>
              <span className="hide-menu">Danh sách sản phẩm</span>
            </a>
          </li>
          <li className="sidebar-item">
            <a
              className="sidebar-link"
              href="/productsale"
              aria-expanded="false"
            >
              <span>
                <i className="ti ti-file-description" />
              </span>
              <span className="hide-menu">Sản phẩm sale</span>
            </a>
          </li>
          <li className="sidebar-item">
            <a
              className="sidebar-link"
              href="/imageproduct"
              aria-expanded="false"
            >
              <span>
                <i className="ti ti-file-description" />
              </span>
              <span className="hide-menu">Hình ảnh sản phẩm</span>
            </a>
          </li>
          <li className="sidebar-item">
            <a
              className="sidebar-link"
              href="/category"
              aria-expanded="false"
            >
              <span>
                <i className="ti ti-alert-circle" />
              </span>
              <span className="hide-menu">Danh sách loại sản phẩm</span>
            </a>
          </li>
          <li className="sidebar-item">
            <a
              className="sidebar-link"
              href="/brand"
              aria-expanded="false"
            >
              <span>
                <i className="ti ti-alert-circle" />
              </span>
              <span className="hide-menu">Danh sách thương hiệu</span>
            </a>
          </li>
          <li className="sidebar-item">
            <a
              className="sidebar-link"
              href="/user"
              aria-expanded="false"
            >
              <span>
                <i className="ti ti-cards" />
              </span>
              <span className="hide-menu">Khách hàng</span>
            </a>
          </li>
          <li className="sidebar-item">
            <a
              className="sidebar-link"
              href="/order"
              aria-expanded="false"
            >
              <span>
                <i className="ti ti-file-description" />
              </span>
              <span className="hide-menu">Đơn hàng</span>
            </a>
          </li>
          <li className="sidebar-item">
            <a
              className="sidebar-link"
              href="/slider"
              aria-expanded="false"
            >
              <span>
                <i className="ti ti-file-description" />
              </span>
              <span className="hide-menu">Slider</span>
            </a>
          </li>
          <li className="sidebar-item">
            <a
              className="sidebar-link"
              href="/contact"
              aria-expanded="false"
            >
              <span>
                <i className="ti ti-file-description" />
              </span>
              <span className="hide-menu">Liên hệ</span>
            </a>
          </li>
          <li className="sidebar-item">
            <a
              className="sidebar-link"
              href="/topic"
              aria-expanded="false"
            >
              <span>
                <i className="ti ti-file-description" />
              </span>
              <span className="hide-menu">Topic</span>
            </a>
          </li>
          <li className="sidebar-item">
            <a
              className="sidebar-link"
              href="/post"
              aria-expanded="false"
            >
              <span>
                <i className="ti ti-file-description" />
              </span>
              <span className="hide-menu">Post</span>
            </a>
          </li>
          <li className="sidebar-item">
            <a
              className="sidebar-link"
              href="/menu"
              aria-expanded="false"
            >
              <span>
                <i className="ti ti-file-description" />
              </span>
              <span className="hide-menu">Menu</span>
            </a>
          </li>

          <li className="nav-small-cap">
            <i className="ti ti-dots nav-small-cap-icon fs-4" />
            <span className="hide-menu">AUTH</span>
          </li>
          <li className="sidebar-item">
            <a
              className="sidebar-link"
              href="./authentication-login.html"
              aria-expanded="false"
            >
              <span>
                <i className="ti ti-login" />
              </span>
              <span className="hide-menu">Đăng nhập</span>
            </a>
          </li>
          <li className="sidebar-item">
            <a
              className="sidebar-link"
              href="./authentication-register.html"
              aria-expanded="false"
            >
              <span>
                <i className="ti ti-user-plus" />
              </span>
              <span className="hide-menu">Đăng xuất</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </aside>

  <div className="body-wrapper">
  </div>
</div>

     );
}

export default Sidebar;