import React, { useEffect, useState } from "react";
import { AiOutlineClose, AiOutlineShoppingCart } from "react-icons/ai";
import { API_URL } from "../../../constants";
import useAxios from "../../../utils/useAxios";
import "./Wishlist.css";
import Lottie from 'react-lottie';
import * as emptyAnimationData from "../../../components/emptyAnimation/empty.json"
import { useStore } from "../../../store/store";

function Wishlist(props) {
  const api = useAxios();
  const [state, dispatch] = useStore();
  const [wishlist, setWishlist] = useState([]);

  const removeFromWishlist = async (id) => {
    try {
      const res = await api.delete(`${API_URL}/wishlist/${id}`);
      if (res.data.error) {
        alert(res.data.error);
      } else {
        alert("Removed from wishlist");
        setWishlist(wishlist.filter((item) => item._id !== id));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const addToCart = async (p_id) => {
    const res = await api.post(`${API_URL}/carts`, {
      product_id: p_id,
    });
    if (!res.data.error) {
      alert("Added to cart");
      setWishlist(wishlist.filter((item) => item._id !== p_id));
      removeFromWishlist(p_id);
    } else {
      alert(res.data.error)
    }
  };

  useEffect(async () => {
    if(state.authenticated){
      const res = await api.get("/wishlist");
      if (!res.data.error) {
        setWishlist(res.data);
      }else{
        console.log(res.data.error)
      }
    }
  }, []);

  const EmptyWishlist = () => {
    return (
      <div style={{ display: 'flex', height: '100%', flexDirection: 'column', justifyContent:'center', alignItems:'center' }}>
        <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
          <Lottie options={{ animationData: emptyAnimationData, autoplay: true, loop: true }} style={{cursor:'initial'}}/>
          <div>The wishlist is empty</div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ height: '100%' }}>
      <div className="wishlist_heading">
        <div>My Wishlist</div>
        <AiOutlineClose onClick={props.onClose} style={{ cursor: "pointer" }} />
      </div>
      {wishlist.length == 0 ? <EmptyWishlist /> : null}
      {wishlist.map((item, i) => {
        return (
          <div className="wishlist_product_container" key={i}>
            <div className="wishlist_product_info">
              <div className="wishlist_product_image">
                <img width={100} height={100} src={item.attributes.image[0]} alt="" />
              </div>
              <div className="wishlist_product_text">
                <div className="wishlist_product_text_heading">
                  <a href="#">{item.name}</a>
                </div>
                <div className="wishlist_product_text_retail_price">
                  Retail Price <span>₹ {item.actual_price}</span>
                </div>
                <div className="wishlist_product_text_offer_price">
                  Offer Price <span>₹ {item.actual_price}</span>
                </div>
              </div>
            </div>
            <div className="wishlist_addtocart">
              <div className="wishlist_cart_add" onClick={() => addToCart(item._id)}>
                <span>
                  <AiOutlineShoppingCart />
                </span>
                Add to Cart
              </div>
              <div
                className="wishlist_remove"
                onClick={() => removeFromWishlist(item._id)}
              >
                Remove
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Wishlist;
