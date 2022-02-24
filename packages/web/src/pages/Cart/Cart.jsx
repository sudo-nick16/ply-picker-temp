import React, { useEffect, useState } from "react";
import { API_URL } from "../../constants";
import useAxios from "../../utils/useAxios";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const api = useAxios();

  const createOrder = async () => {
    const res = await api.post(`${API_URL}/orders`);
    if (!res.data.error) {
      alert("Order Placed");
    } else {
      alert(res.data.error);
    }
  };

  const removeFromCart = async (id) => {
    const res = await api.delete(`${API_URL}/carts/${id}`);
    if (res.data.error) {
      alert(res.data.error);
    } else {
      setCart(cart.filter((item) => item._id !== id));
    }
  };

  useEffect(async () => {
    const res = await api.get(`${API_URL}/carts/my-cart`);
    if (res.data.error) {
      alert(res.data.error);
    } else {
      setCart(res.data);
    }
  }, []);
  return (
    <div>
      <h2>Cart boi</h2>
      <center>
        <button onClick={createOrder}>
          <h1>Order boi</h1>
        </button>
      </center>
      {cart.map((cartItem) => {
        return (
          <div key={cartItem._id}>
            <h6>{cartItem._id}</h6>
            <h4>Name : {cartItem.product_id.Product_Name}</h4>
            <p>desc : {cartItem.product_id.Product_Description}</p>
            <p>price : {cartItem.product_id.Product_Price}</p>
            <p>quantity : {cartItem.quantity}</p>
            <button onClick={() => removeFromCart(cartItem._id)}>Remove</button>
          </div>
        );
      })}
    </div>
  );
};

export default Cart;
