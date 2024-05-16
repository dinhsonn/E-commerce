  import React, { useEffect, useState } from "react";
  import axios from "axios";
  import { Link } from "react-router-dom";
  import Sidebar from "../../../components/Admin/Sidebar";

  function Order() {
    const [orders, setOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [ordersPerPage] = useState(10);

    useEffect(() => {
      loadOrders();
    }, [currentPage]);

    const loadOrders = async () => {
      try {
        const responseOrders = await axios.get("http://localhost:8384/api/orders");
        const responseOrderDetails = await axios.get("http://localhost:8384/api/orderdetails");

        // Kết hợp dữ liệu từ cả hai API
        const mergedOrders = responseOrders.data.content.map(order => {
          const orderDetail = responseOrderDetails.data.content.find(detail => detail.orderId.id === order.id);
          return {
            ...order,
            orderDetail: orderDetail ? orderDetail : null,
            productName: orderDetail ? orderDetail.cartItems[0].product.title : "",
            productQuantity: orderDetail ? orderDetail.cartItems[0].quantity : 0
          };
        });
        
        
        setOrders(mergedOrders);
      } catch (error) {
        console.error("Error loading orders:", error);
      }
    };

    const deleteOrder = async (id) => {
      try {
        await axios.delete(`http://localhost:8384/api/orders/${id}`);
        loadOrders();
      } catch (error) {
        console.error("Error deleting order:", error);
      }
    };

    const paginate = (pageNumber) => {
      setCurrentPage(pageNumber);
    };

    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

    return (
      <div className="d-flex">
        <Sidebar />
        <div className="container">
          <div className="py-4">
            <div className="d-flex justify-content-between mb-3">
              <h1 className="display-10">Danh sách đơn hàng</h1>
            </div>
            <table className="table border shadow">
              <thead>
                <tr>
                  <th scope="col">Tên</th>
                  <th scope="col">Địa chỉ</th>
                  <th scope="col">Tên hàng</th>
                  <th scope="col">Số lượng</th>
                  <th scope="col">Tổng số tiền</th>
                  <th scope="col">Mô tả</th>
                  <th scope="col">Tình trạng</th>
                  <th scope="col">Chức năng</th>
                </tr>
              </thead>
              <tbody>
                {currentOrders.map((order, index) => (
                  <tr key={index}>
                    <td>{order.userId.name}</td>
                    <td>{order.userId.address}</td>
                    <td>{order.productName}</td>
                    <td>{order.productQuantity}</td>
                    <td>{order.orderDetail ? order.orderDetail.amount : ""}</td>
                    <td>{order.note}</td>
                    <td>{order.status}</td>

                    <td>
                      <Link
                        className="btn btn-primary mx-2"
                        to={`/order/view-order/${order.id}`}
                      >
                        Xem
                      </Link>
                      <Link
                        className="btn btn-outline-primary mx-2"
                        to={`/order/edit-order/${order.id}`}
                      >
                        Sửa
                      </Link>
                      <button
                        className="btn btn-danger mx-2"
                        onClick={() => deleteOrder(order.id)}
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
                {[...Array(Math.ceil(orders.length / ordersPerPage)).keys()].map((number) => (
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

  export default Order;
