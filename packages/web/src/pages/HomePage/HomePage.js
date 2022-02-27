import React, { useEffect } from "react";
import Banner from "./Banner/Banner";
import BrandstoChoose from "./BrandstoChoose/BrandstoChoose";
import CarouselComponent from "./Carousel/CarouselComponent";
import EveryoneEyeing from "./EveryoneEyeing/EveryoneEyeing";
import Footer from "./Footer/Footer";

function HomePage() {
  useEffect(() => {
    document.title = "Plypicker" 
  }, [])
  
  return (
    <div style={{ overflowX: "hidden" }}>
      <CarouselComponent />
      <Banner />
      <EveryoneEyeing />
      <BrandstoChoose />
      <Footer />
    </div>
  );
}

export default HomePage;
