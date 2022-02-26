import React, { useEffect, useState } from "react";
import { API_URL } from "../../constants";
import useAxios from "../../utils/useAxios";


const Cart = () => {
  const [cart, setCart] = useState([]);
  const api = useAxios();
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [payment, setPayment] = useState("COD");

  const createOrder = async () => {
    console.log(address, "\nphone", phone, "\npayment", payment);
    // return;

    const res = await api.post(`${API_URL}/orders`, {
      address,
      phone,
      payment_mode: payment,
    });
    if (!res.data.error) {
      alert("Order Placed");
      setCart([]);
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
      <select name="Payment" onChange={(e) => setPayment(e.target.value)} id="">
        <option value="COD">COD</option>
        <option value="ONLINE">ONLINE</option>
      </select>
      <input
        type="number"
        maxlength="10"
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Phone"
      />
      <div>
        <input
          type="text"
          onChange={(e) =>
            setAddress((a) => ({ ...a, address_line_1: e.target.value }))
          }
          placeholder="address line 1"
        />
        <input
          type="text"
          onChange={(e) =>
            setAddress((a) => ({ ...a, address_line_2: e.target.value }))
          }
          placeholder="address line 2"
        />
        <input
          type="text"
          onChange={(e) => setAddress((a) => ({ ...a, city: e.target.value }))}
          placeholder="city"
        />
        <input
          type="text"
          onChange={(e) => setAddress((a) => ({ ...a, state: e.target.value }))}
          placeholder="state"
        />
        <input
          type="text"
          onChange={(e) =>
            setAddress((a) => ({ ...a, country: e.target.value }))
          }
          placeholder="country"
        />
        <input
          type="text"
          onChange={(e) =>
            setAddress((a) => ({ ...a, pincode: e.target.value }))
          }
          placeholder="pincode"
        />
      </div>
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
