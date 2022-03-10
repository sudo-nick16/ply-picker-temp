import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../constants";
import "./ProductCard.scss";

const ProductCard = ({ p_id, quantity, price }) => {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(async () => {
    const res = await axios.get(`${API_URL}/products/${p_id}`);
    console.log(res.data);
    if (!res.data.error) {
      setProduct(res.data);
    } else {
    }
    setLoading(false);
  }, []);
  return loading ? null : (
    <div className="product-container">
      <img
        src={product.attributes.image[0]}
        alt=""
        onClick={() => navigate(`/productdetails/${p_id}`)}
      />
      <div className="product-details">
        <h4 onClick={() => navigate(`/productdetails/${p_id}`)}>
          {product.name}
        </h4>
        <p className="text-truncate">{product.description}</p>
        <h6>Quantity: {quantity}</h6>
        <h6>Cost: {price}</h6>
      </div>
    </div>
  );
};

export default ProductCard;
