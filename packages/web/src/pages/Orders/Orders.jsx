import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../constants";
import useAxios from "../../utils/useAxios";

const Orders = () => {
  const navigate = useNavigate();
  const api = useAxios();
  const [orders, setOrders] = useState([]);
  useEffect(async () => {
    const res = await api.get(`${API_URL}/orders`);
    console.log(res.data);
    if (!res.data.error) {
      setOrders(res.data);
    } else {
      console.log(res.data.error);
    }
  }, []);
  return (
    <>
      <div>Orders</div>
      {orders.map((order) => {
        return (
          <div key={order._id}>
            <button onClick={() => navigate(`/orders/${order._id}`)}>
              {order._id}
            </button>
            <h4>Total Items: {order.order_items.length}</h4>
            <h5>Amount: {order.total}</h5>
            <h5>Payment Status: {order.payment.status}</h5>
            <h5>Payment Mode: {order.payment.mode}</h5>
          </div>
        );
      })}
    </>
  );
};

export default Orders;
