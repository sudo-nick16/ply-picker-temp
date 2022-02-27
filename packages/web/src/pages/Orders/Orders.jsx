import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../constants";
import useAxios from "../../utils/useAxios";
import axios from "axios";
import "./Orders.scss";
import OrderCard from "./OrderCard";

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
    <div className="orders-container">
      {!orders.length ? (
        <div className="order-container no-orders">
          <img
            src="https://ii1.pepperfry.com/images/empty-cart-icon.png"
            alt=""
          />
          <span>You have no placed any order yet.</span>
          <span>You order details will appear here once you do.</span>
        </div>
      ) : (
        orders.map((order) => <OrderCard key={order._id} order={order} />)
      )}
    </div>
  );
};

export default Orders;
