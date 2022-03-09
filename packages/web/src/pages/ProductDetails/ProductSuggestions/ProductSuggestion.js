import React, { Component, useState } from "react";
import Slider from "react-slick";
import "./ProductSuggestion.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
import lengthyText from "../../../helperFunctions/lengthyText";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "#696969" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "#696969" }}
      onClick={onClick}
    />
  );
}

function ProductSuggestion(props) {

  const navigate = useNavigate()

  var settings = {
    dots: true,
    arrows: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    infinite: false,
    speed: 500,
    slidesToShow: 2.5,
    slidesToScroll: 2,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1.5,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const Item = (props) => (
    <div className="suggestion_product_main" onClick={()=>navigate(`/productdetails/${props.id}`)}>
      <div className="suggestion_container_leftside">
        <div className="production_suggestion_pimage">
          <img src={props.image} alt="" />
        </div>
      </div>
      <div className="suggestion_container_rightiside">
        <div
          className="product_suggestion_pname text-truncate"
        >
          {lengthyText(props.name, 15)}
        </div>
        <div className="product_suggestion_pamount">{props.price}</div>
      </div>
    </div>
  );
  return (
    <div className="container" style={{ width: "100%" }}>
      <div className="product_suggestion_container">
        <h2>You might also like</h2>
        <Slider {...settings}>
          {props.data.map((item, i) => (
            <Item key={i}
              id={item._id}
              name={item.name}
              price={item.actual_price}
              // image={item.Product_Image}
              image={"https://images.unsplash.com/photo-1646617747557-13b45b277bc6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"}
            />
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default ProductSuggestion;
