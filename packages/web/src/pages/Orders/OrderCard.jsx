import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../constants";
import "./OrderCard.scss";

const OrderCard = ({ order }) => {
  const [prod, setProduct] = useState({});
  const navigate = useNavigate();

  const getDate = (date) => {
    const dateStr = new Date(date).toDateString().split(" ");
    // const d = dateStr.
    return `${dateStr[1]} ${dateStr[2]}, ${dateStr[3]}`;
  };

  useEffect(async () => {
    const res = await axios.get(
      `${API_URL}/products/${order.order_items[0].product}`
    );
    console.log(res.data);
    if (!res.data.error) {
      setProduct(res.data);
    } else {
      console.log(res.data.error);
    }
  }, []);

  return (
    <div className="order-card-container">
      <img
        src={prod.Product_Image}
        onClick={() => navigate(`/orders/${order._id}`)}
        alt=""
      />
      <div className="order-container-details">
        <h6>Placed on {getDate(order.createdAt)}</h6>
        <p>{prod.Product_Name}</p>
        <h6>Items: {order.order_items.length}</h6>
        <h6>Cost: Rs {order.total}</h6>
      </div>
    </div>
  );
};

export default OrderCard;
