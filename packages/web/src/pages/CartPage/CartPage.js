import React, { useEffect, useState } from "react";
import "./CartPage.css";
import {
  FaGreaterThan,
  FaMapMarkerAlt,
  FaRegCalendarAlt,
  FaRegHeart,
  FaTrashAlt,
} from "react-icons/fa";
import axios from "axios";

import { RiCoupon2Line } from "react-icons/ri";
import useAxios from "../../utils/useAxios";
import { API_URL } from "../../constants";
import { Link, useNavigate } from "react-router-dom";
import { useStore } from "../../store/store";

const loadScript = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

const RZR_PAY_ID = process.env.REACT_APP_RZR_PAY_KEY_ID;

function CartPage() {
  const api = useAxios();
  const [count, setCount] = useState(1);
  const [cart, setCart] = useState([]);
  const [address, setAddress] = useState({});
  const [phone, setPhone] = useState("");
  const [payment, setPayment] = useState("COD");
  const [cartValue, setCartValue] = useState(0);
  const [totalCartItems, setTotalCartItems] = useState(0);
  const [state, dispatch] = useStore();
  useEffect(() => {
    document.title = "Checkout";
  }, []);

  const navigate = useNavigate();

  useEffect(() => {
    getTotalItems(cart);
    updateCartValue(cart);
  }, [cart]);

  const getTotalItems = (cartArr) => {
    let sum = 0;
    cartArr.map((cartItem) => {
      sum += cartItem.quantity;
    });
    setTotalCartItems(sum);
  };

  const updateCartValue = (cartArr) => {
    setCartValue(() =>
      cartArr.reduce(
        (total, item) => total + item.product_id.actual_price * item.quantity,
        0
      )
    );
  };

  const addToCart = (p_id) => {
    let outOfStock = false;

    // cart.map((cartItem) => {
    //   if (cartItem.product_id._id == p_id) {
    //     if (cartItem.quantity == cartItem.product_id.Quantity) {
    //       alert("Max quantity reached");
    //       outOfStock = true;
    //     }
    //   }
    // });

    const postCart = async () => {
      const res = await api.post(`${API_URL}/carts`, {
        product_id: p_id,
      });
      if (!res.data.error) {
        // alert("Added to cart");
        setCart(
          cart.map((item) => {
            if (item.product_id._id === p_id) {
              item.quantity++;
            }
            return item;
          })
        );
      } else {
        alert(res.data.error);
      }
    };

    if (!outOfStock) {
      postCart();
    }
  };

  const removeProductFromCart = async (c_id) => {
    const res = await api.patch(`${API_URL}/carts/${c_id}`);
    if (res.data.error) {
      alert(res.data.error);
    } else {
      let updatedArr = cart.map((item) => {
        if (item._id === c_id) {
          item.quantity--;
        }
        return item;
      });
      setCart(updatedArr);
    }
  };

  const removeFromCart = async (id) => {
    const res = await api.delete(`${API_URL}/carts/${id}`);
    if (res.data.error) {
      alert(res.data.error);
    } else {
      let updatedArr = cart.filter((item) => item._id !== id);
      setCart(updatedArr);
    }
  };

  const addToWishlist = async (p_id, c_id) => {
    try {
      const res = await api.post(`${API_URL}/wishlist`, {
        p_id,
      });
      if (!res.data) {
        throw new Error("Could not add to wishlist");
      }
      const resp = await api.delete(`${API_URL}/carts/${c_id}`);
      if (resp.data.error) {
        alert(resp.data.error);
      } else {
        alert("Added to wishlist and removed from cart");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const createOrder = async () => {
    console.log(address, "\nphone", phone, "\npayment", payment);
    // return;
    const res = await api.post(`/orders`, {
      address,
      phone,
      payment_mode: payment,
    });
    if (!res.data.error && res.data.order_id) {
      alert("Order Placed Successfully");
      setCart([]);
      navigate(`/orders/${res.data.order_id}`);
    } else {
      alert(res.data.error);
    }
  };

  const payAndPlaceOrder = async () => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const result = await api.post("/payment/orders", {
      address,
      phone,
      payment_mode: "razorpay",
    });

    if (result.data.error) {
      alert("Server error. Are you online?");
      return;
    }
    console.log(result);
    // Getting the order details back
    const { amount, id: order_id, currency } = result.data.order;
    const { mongoOrderId } = result.data;

    console.log("mongo order id : ", mongoOrderId);

    const options = {
      key: RZR_PAY_ID,
      amount: amount.toString(),
      currency: currency,
      name: "Ply Picker",
      description: "Payment for Order",
      image: "/public/favicon.ico",
      order_id: order_id,
      handler: async function (response) {
        const data = {
          orderCreationId: order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
          mongoOrderId,
        };

        const result = await api.post("/payment/verify", data);
        if(result.data.error){
          console.log("Failed order..",result.data.error);
        }
        alert(result.data.msg);
      },
      prefill: {
        name: state.user.name,
        email: state.user.email,
        contact: state.user.mobile_number,
      },
      notes: {
        address: state.user.addresses[0].address,
      },
      theme: {
        color: "#F68319",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.on('payment.failed', async function (response){
      alert(response.error.code);
      console.log("Yo boii", response);

      const result = await api.post("/payment/verify", {
        razorpayOrderId: response.error.metadata.order_id,
        razorpayPaymentId: response.error.metadata.payment_id,
        razorpaySignature: "",
      });
      if(result.data.error){
        console.log("Failed order..",result.data.error);
      }
      paymentObject.close();
      payAndPlaceOrder();
    })
    paymentObject.open();
  };

  useEffect(() => {
    const getCart = async () => {
      const res = await api.get(`${API_URL}/carts/my-cart`);
      // console.log(res.data)
      if (res.data.error) {
        alert(res.data.error);
      } else {
        setCart(res.data);
      }
    };
    getCart();
  }, []);

  return (
    <div className="container cartpagemain">
      <div className="cartpage_heading">
        In Your Cart{" "}
        <span>
          ({totalCartItems} Item{totalCartItems === 1 ? null : "s"})
        </span>
      </div>
      <div className="cartpage_maincontainer">
        <div className="cartpage_product_side">
          <div className="cartpage_product_side_pincode">
            <div className="pincode_location_icon">
              <FaMapMarkerAlt />
              <div className="pincode_text">
                Enter Your Pincode For Delivery & Assembly Information
              </div>
            </div>

            <div className="pincode_pincode_button">
              <input
                type="text"
                className="order_summary_pincode"
                placeholder="Pincode"
                maxLength="6"
              />
              <input
                type="button"
                className="order_summary_pincode_btn"
                value="GO"
              />
            </div>
          </div>
          {/*  */}
          {cart.map((cartItem) => {
            let product = cartItem.product_id;
            return (
              <div key={cartItem._id} className="product_side_product">
                <div className="product_product_image_info">
                  <div className="product_image_image">
                    <img
                      width={100}
                      height={100}
                      src={product.attributes.image[0]}
                      alt=""
                    />
                  </div>
                  <div className="product_product_info">
                    <div className="product_product_info_heading">
                      <Link to={`/productdetails/${product._id}`}>
                        {product.name}
                      </Link>
                    </div>
                    <div className="product_product_info_warranty">
                      <p>36 Months' Warranty, 100% Genuine</p>
                    </div>
                    <div className="product_product_info_delivery">
                      <div className="delivery_info_calender">
                        <FaRegCalendarAlt />
                      </div>
                      <div className="delivery_info_text">
                        Delivery by <br />
                        <span>
                          Enter your Pincode above to get these details
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="product_product_quantity">
                  <div>
                    <div className="quantity_counter">
                      <div
                        className="product_counter_remove"
                        type="button"
                        onClick={() => removeProductFromCart(cartItem._id)}
                      >
                        -
                      </div>
                      <div className="product_counter_count">
                        {cartItem.quantity}
                      </div>
                      <div
                        className="product_counter_add"
                        type="button"
                        onClick={() => addToCart(product._id)}
                      >
                        +
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      Rs. {cartItem.quantity * cartItem.product_id.actual_price}
                    </div>
                  </div>
                  <div className="product_remove_wishlist">
                    <FaTrashAlt
                      className="product_remove_icon"
                      onClick={() => removeFromCart(cartItem._id)}
                    />
                    <FaRegHeart
                      className="product_wishlist_icon"
                      onClick={() => addToWishlist(product._id, cartItem._id)}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="cartpage_pricing_side">
          <div className="coupon_container">
            <div className="coupon_icon">
              <RiCoupon2Line />
              <span>Apply Coupon</span>
            </div>
            <div className="coupon_rightarrow">
              <FaGreaterThan />
            </div>
          </div>
          <div className="pricing_side_price_container">
            <div className="cart_value">
              <div className="cart_value_text">Cart Value</div>
              <div className="cart_value_value">Rs. {cartValue}</div>
            </div>
            {/* <div className="retail_discount">
              <div className="retail_discount_text">Retail Discount</div>
              <div className="retail_discount_value">(-) Rs.121212</div>
            </div> */}
            <div className="price_extra_info">
              Delivery & Assembly Charges Extra. Enter Pincode to Know
            </div>
            <div className="price_total_amount">
              <div className="total_amount_text">Total</div>
              <div className="total_amount_amount">
                <div className="total_amount_amount_price">
                  Rs. {cartValue}{" "}
                </div>
                <div className="total_amount_amount_text">
                  (Inclusive of all taxes)
                </div>
              </div>
            </div>
          </div>
          <div
            className="pricing_side_placeorder_button"
            type="button"
            onClick={createOrder}
          >
            Place Order
          </div>
          <div
            className="pricing_side_placeorder_button"
            type="button"
            onClick={payAndPlaceOrder}
          >
            Pay and Place Order
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
