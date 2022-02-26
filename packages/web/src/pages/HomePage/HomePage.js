import React from "react";
import Banner from "./Banner/Banner";
import BrandstoChoose from "./BrandstoChoose/BrandstoChoose";
import CarouselComponent from "./Carousel/CarouselComponent";
import EveryoneEyeing from "./EveryoneEyeing/EveryoneEyeing";
import Footer from "./Footer/Footer";
import MegaMenu from "./MegaMenu/MegaMenu";
import SearchComponent from "./Search/SearchComponent";

function HomePage() {
  return (
    <div style={{ overflowX: "hidden" }}>
      <MegaMenu />

      <CarouselComponent />
      <Banner />
      <EveryoneEyeing />
      <BrandstoChoose />
      <Footer />
    </div>
  );
}

export default HomePage;
