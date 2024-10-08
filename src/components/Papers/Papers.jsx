import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
export default function SimpleSlider() {
  var settings = {
  
    infinite: true,
   
   
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  return (
    <Slider {...settings} className="w-[1570px]  px-3">
      <div className="bg-gray-300 mt-10  h-[630px] " >
        <h3>paper1</h3>
      </div>
      <div className="bg-gray-300  mt-10 h-[600px] ">
        <h3>paper2</h3>
      </div>
      <div className="bg-gray-300  mt-10 h-[600px] ">
        <h3>3</h3>
      </div>
      <div className="bg-gray-300  mt-10 h-[600px] ">
        <h3>4</h3>
      </div>
      <div className="bg-gray-300  mt-10 h-[600px] ">
        <h3>5</h3>
      </div>
      <div className="bg-gray-300  mt-10 h-[600px] text-white">
        <h3>6</h3>
      </div>
    </Slider>
  );
}

