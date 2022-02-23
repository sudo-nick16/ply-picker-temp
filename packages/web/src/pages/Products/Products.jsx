import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../constants";
import { useStore } from "../../store/store";
import "./Products.scss";

// add to cart option will only be available on product - didn't wanna spend much time on the ui
// so implemented it in products page but the logic will only work properly on product page
const Product = () => {
  const [products, setProducts] = useState([]);
  const [state, dispatch] = useStore();
  const navigate = useNavigate();

  useEffect(async () => {
    const res = await axios.get(API_URL + "/products");
    setProducts(res.data.reverse());
  }, []);
  return (
    <div className="products-container">
        <button onClick={() => navigate("/cart")}>Go to Cart</button>
      {products.map((product) => {
        return (
          <div key={product._id}>
            <h4>Name : {product.Product_Name}</h4>
            <p>desc : {product.Product_Description}</p>
            <p>price : {product.Product_Price}</p>
            <p>quantity : {product.Quantity}</p>
            {/* or navigate to slugified product title along with is product id */}
            <button onClick={() => navigate(`/product/${product._id}`)}>Go to Product</button>
            <input type="number" />
          </div>
        );
      })}
    </div>
  );
};

export default Product;
