import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import slide1 from '../../../public/Slide1.png';
import slide2 from '../../../public/Slide2.png';
import slide3 from '../../../public/Slide3.png';
import slide4 from '../../../public/Slide4.png';
import slide5 from '../../../public/Slide5.png';
import slide6 from '../../../public/Slide6.png';


export default function Home()
{
    var settings = {
  
        infinite: true,
       
       
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
      };
      return (
        <Slider {...settings} className="w-[1570px]  px-3">
          <div className=" mt-10  h-[400px] " >
           <img src={slide1}/>
          </div>
          <div className="  mt-10 h-[600px] ">
          <img src={slide2}/>
          </div>
          <div className=" mt-10 h-[600px] ">
          <img src={slide3}/>
          </div>
          <div className=" mt-10 h-[600px] ">
          <img src={slide4}/>
          </div>
          <div className=" mt-10 h-[600px] ">
          <img src={slide5}/>
          </div>
          <div className="  mt-10 h-[600px] text-white">
          <img src={slide6} />
          </div>
        </Slider>
      )
}