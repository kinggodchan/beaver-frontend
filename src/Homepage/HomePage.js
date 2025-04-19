import React from "react";
import "../Homepage/HomePage.css";
import Navbar from "../components/Navbar";
import Body from "../components/BodyContent";
import Footer from "../components/Footer";

const HomePage = () => {
  return (
    <div className="homepage">
      <Navbar />
      <Body />
      <Footer />
    </div>
  );
};

export default HomePage;
