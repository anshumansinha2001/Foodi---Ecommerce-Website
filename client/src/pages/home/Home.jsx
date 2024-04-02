import React, { useEffect } from "react";
import Banner from "../../components/Banner";
import Catagories from "./Catagories";
import SpecialDishes from "./SpecialDishes";
import Testimonials from "./Testimonials";
import OurServices from "./OurServices";

const Home = () => {
  useEffect(() => {
    // Scroll to the top of the page when component mounts
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <Banner />
      <Catagories />
      <SpecialDishes />
      <Testimonials />
      <OurServices />
    </div>
  );
};

export default Home;
