import React from "react";
import "./Carousel.css";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";

function CarouselComponent() {
  return (
    <div className="container carousel-container">
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://assets.myntassets.com/f_webp,w_820,c_limit,fl_progressive,dpr_2.0/assets/images/2022/2/14/a0f0827a-e431-4585-a450-54b750ae1ae41644849164565-H-N_Desk_Banner.jpg"
            alt="First slide"
          />
          <Carousel.Caption>
            {/* <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://assets.myntassets.com/f_webp,w_820,c_limit,fl_progressive,dpr_2.0/assets/images/2022/2/14/628b92a9-90b0-49e5-b893-0f785a268de71644849295276-Sangria_Desk_Banner.jpg"
            alt="Second slide"
          />

          <Carousel.Caption>
            {/* <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> */}
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://assets.myntassets.com/f_webp,w_820,c_limit,fl_progressive,dpr_2.0/assets/images/2022/2/14/e8a6c496-d2e1-4236-8f81-bbc391e065d41644850839089-Running-Shoes_Desk--1-.jpg"
            alt="Third slide"
          />

          <Carousel.Caption>
            {/* <h3>Third slide label</h3> */}
            <p>
              {/* Praesent commodo cursus magna, vel scelerisque nisl consectetur. */}
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default CarouselComponent;
