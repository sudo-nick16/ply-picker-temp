import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../../constants";
import useAxios from "../../utils/useAxios";
import "./Order.scss";
import ProductCard from "./ProductCard";

const Order = () => {
  const api = useAxios();
  const { order_id } = useParams();
  const [order, setOrder] = useState({ order_items: [] });

  useEffect(async () => {
    const res = await api.get(`/orders/${order_id}`);
    if (!res.data.error) {
      setOrder(res.data);
    } else {
      alert(res.data.error);
    }
  }, []);
  return (
    <div className="order-container">
      <h5>Total Amount: Rs. {order.total}</h5>
      <h5>Total Items: {order.order_items.length}</h5>
      {order.order_items.map((prod) => {
        return <ProductCard price={prod.price} quantity={prod.quantity} p_id={prod.product} key={prod._id} />;
      })}
    </div>
  );
};

export default Order;
