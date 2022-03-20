import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../../constants";
import useAxios from "../../utils/useAxios";
import ProductCard from "../Order/ProductCard";
import "./DeliveryPage.scss";

const DeliveryPage = () => {
  const [order, setOrder] = useState({ order_items: [] });
  const { order_id } = useParams();
  const [loading, setLoading] = useState(true);
  // const api = useAxios();

  useEffect(async () => {
    const res = await axios.get(`${API_URL}/delivery/orders/${order_id}`);
    if (!res.data.error) {
      setOrder(res.data);
    } else {
      alert(res.data.error);
    }
    setLoading(false);
  }, []);

  return loading ? (
    <div>Loading...</div>
  ) : (
    <div className="delivery-container">
      <h5>Payment Mode: {order.payment.mode.toLowerCase()}</h5>
      <h5>Payment Status: {order.payment.status.toLowerCase()}</h5>
      <h5>Amount to be paid: Rs. {order.total}</h5>
      <h5>Total Items: {order.order_items.length}</h5>
      <div className="address-container">
        <h5>Address:</h5>
        <p>
          {order.address.name}
          <br />
          {order.address.address}
          <br />
          {order.address.city}
          <br />
          {order.address.state}
          <br />
          {order.address.country}
          <br />
          {order.address.pincode}
        </p>
      </div>
      {order.order_items.map((prod) => {
        return (
          <ProductCard
            price={prod.price}
            quantity={prod.quantity}
            p_id={prod.product}
            key={prod._id}
          />
        );
      })}
    </div>
  );
};

export default DeliveryPage;
