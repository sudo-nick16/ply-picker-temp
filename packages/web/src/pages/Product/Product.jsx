import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../../constants";
import { setUser } from "../../store/reducers/userActions";
import { useStore } from "../../store/store";
import useAxios from "../../utils/useAxios";

const Product = () => {
  const [product, setProduct] = useState({});
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const { p_id } = useParams();
  console.log(p_id);
  const [_, dispatch] = useStore();
  const navigate = useNavigate();
  const api = useAxios();

  // only handler that matters
  const addToCart = async () => {
    const res = await api.post(`${API_URL}/products/add-to-cart`, {
      product_id: p_id,
      quantity,
    });
    if (!res.data.error) {
      const { accessToken } = res.data;
      dispatch(setUser(accessToken, true))
    }else{
      alert(res.data.error)
    }
  };

  useEffect(async () => {
    const res = await axios.get(`${API_URL}/products/${p_id}`);
    setProduct(res.data);
    const { Product_Name, Product_Description, Quantity, Product_Price } =
      res.data;
    setName(Product_Name);
    setQuantity(Quantity);
    setDesc(Product_Description);
    setPrice(Product_Price);
    console.log(res.data);
  }, []);

  return (
    <>
      <div>Product</div>
      <button onClick={() => navigate("/cart")}>Go to Cart</button>
      <div>
        <h3>{name}</h3>
        <p>{desc}</p>
        <h5>In Stock : {quantity}</h5>
        <h4>Price : {price}</h4>
        <button onClick={addToCart}>Add to Cart</button>
      </div>
    </>
  );
};

export default Product;
