import React, { useState, useEffect, lazy, Suspense } from "react";
const VideoCom =lazy(()=>import('../Video/Video'))
import image1 from "../../../public/Sensors.png";
import image2 from "../../../public/Connectivity.png";
import image3 from "../../../public/Automation.png";
import image4 from "../../../public/Cloud.png";
import image5 from "../../../public/iot.jpg";


import Aos from "aos";
import "aos/dist/aos.css";

export default function HomeFirst() {
  useEffect(() => {
    Aos.init({ duration: 1200 });
  }, []);

 

  const [isHovered, setIsHovered] = useState({
    image1: false,
    image2: false,
    image3: false,
    image4: false,
  });

  const handleMouseEnter = (image) => {
    setIsHovered((prevState) => ({ ...prevState, [image]: true }));
  };

  const handleMouseLeave = (image) => {
    setIsHovered((prevState) => ({ ...prevState, [image]: false }));
  };

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
       <VideoCom/>
      </Suspense>

      {/* Image Hover Section */}
      <div
        data-aos="fade-up-right"
        className="md:mt-12 md:w-full mt-10 md:text-white  md:absolute text-center text-2xl md:text-6xl font-bold"
      >
        <h1 className="text-white ">ARCHITECTURE OF IOT</h1>
      </div>

      <div className="  mt-4 items-center flex md:mt-8 md:gap-10 md:h-[800px] bg-gray-900   flex-wrap justify-center p-2 md:p-4">
    
        <div
          data-aos="fade-left"
          className="text-center md:h-[300px] md:w-[270px] md:max-w-xs md:rounded md:text-black md:bg-gray-100 md:overflow-hidden md:shadow-lg md:my-2"
        >
          <img
            onMouseEnter={() => handleMouseEnter("image1")}
            onMouseLeave={() => handleMouseLeave("image1")}
            src={image1}
            className={`h-[150px] w-[150px] md:h-[250px] md:w-[250px]   text-white  md:ml-0 md:mt-4 md:bg-gradient-to-t transform ${
              isHovered.image1 ? "scale-125" : "scale-100"
            }`}
            style={{
              display: "inline-block",
              willChange: "transform", 
              transition: "md:transform 0.3s ease-in-out", 
            }}
          />
          <h1 className="md:ml-2 ml-[-10px] text-white md:text-black text-lg md:mt-[-15px] font-bold md:p-2 md:text-2xl md:cursor">Sensor</h1>
        </div>

       
        <div
          data-aos="fade-up-right"
          className="md:max-w-xs md:h-[300px]text-lg md:w-[270px]  text-center md:rounded md:bg-gray-100 md:overflow-hidden md:shadow-lg md:my-2"
        >
          <img
            onMouseEnter={() => handleMouseEnter("image2")}
            onMouseLeave={() => handleMouseLeave("image2")}
            src={image2}
            
            className={` h-[150px] w-[150px] md:h-[250px] md:w-[250px]  md:text-white md:ml-0 md:mt-4 md:bg-gradient-to-t transform ${
              isHovered.image2 ? "scale-125" : "scale-100"
            }`}
            style={{
              display: "inline-block",
              willChange: "transform",
              transition: "md:transform 0.3s ease-in-out",
            }}
          />
          <h1 className="md:ml-2 ml-4  text-white md:text-black text-lg  md:mt-[-14px] font-bold md:p-2 md:text-2xl md:cursor">Connectivity</h1>
        </div>

    
        <div
          data-aos="fade-down-right"
          className="md:max-w-xs   md:h-[300px] md:w-[270px] text-center md:rounded md:bg-gray-100 md:overflow-hidden md:shadow-lg md:my-2"
        >
          <img
            onMouseEnter={() => handleMouseEnter("image3")}
            onMouseLeave={() => handleMouseLeave("image3")}
            src={image3}
           
            className={`  h-[150px] w-[150px]  md:h-[250px] md:w-[250px]  md:text-white   md:ml-0 md:mt-4 md:bg-gradient-to-t transform ${
              isHovered.image3 ? "scale-125" : "scale-100"
            }`}
            style={{
              display: "inline-block",
              willChange: "transform",
              transition: "md:transform 0.3s ease-in-out", 
            }}
          />
          <h1 className="md:ml-2 ml-2 text-white md:text-black mt-2 text-lg md:mt-[-14px] font-bold md:p-2 md:text-2xl md:cursor">Automation</h1>
        </div>

        
        <div
          data-aos="fade-right"
          className="md:max-w-xs  md:h-[300px] md:w-[270px] text-center md:rounded md:bg-gray-100 md:overflow-hidden md:shadow-lg md:my-2"
        >
          <img
            onMouseEnter={() => handleMouseEnter("image4")}
            onMouseLeave={() => handleMouseLeave("image4")}
            src={image4}
            
            className={`  h-[150px] w-[150px]  md:h-[250px] md:w-[250px]  md:text-white md:ml-0 md:mt-4 md:bg-gradient-to-t transform ${
              isHovered.image4 ? "scale-125" : "scale-100"
            }`}
            style={{
              display: "inline-block",
              willChange: "transform", 
              transition: "md:transform 0.3s ease-in-out", 
            }}
          />
          <h1 className="md:ml-4 text-white md:text-black text-lg md:mt-[-14px] mt-2 font-bold md:p-2 md:text-2xl md:cursor">Cloud</h1>
        </div>
      </div>

     
      <div
        data-aos="fade-up-right"
        className="md:mt-1 mt-4  relative md:h-[800px] md:bg-gray-600"
      >
        <div className="text-white md:mt-[-50px] mt-20">
          <h1
            data-aos="fade-up-right"
            className="md:ml-40 text-blue-800 md:absolute mt-16 md:font-bold text-center md:text-3xl md:text-green-400"
          >
            Innovate with IoT
          </h1>
          <h1
            data-aos="fade-up-right"
            className="md:ml-40  relative text-2xl font-bold top-4 ml-2 md:absolute md:mt-28 md:font-bold md:text-5xl"
          >
            Your Gateway To IoT
          </h1>
          <h1
            data-aos="fade-up-right"
            className="md:ml-40 font-bold p-2 mt-72 md:absolute md:mt-44 md:font-bold md:text-5xl"
          >
            Advancement
          </h1>
        </div>

        <div className="  md:w-[460px] md:absolute md:mt-56 md:font-bold text-white md:ml-40 md:text-2xl md:text-justify">
          <p
            data-aos="fade-up-right"
            className="md:text-white text-sm  p-2 leading-6 md:text-2xl md:font-bold md:drop-shadow-2xl md:drop-shadow-gray-500"
          >
            Welcome to Conexus – a nexus of ingenuity and connectivity! Step
            into a dynamic realm where IoT insights converge with real-time
            innovations. Explore transformative research, pioneering projects,
            and avant-garde automation tools that redefine smart technology. With
            intuitive design and interactive elements, Conexus bridges curiosity
            and mastery, guiding you through the pulse of modern advancements.
            Begin your journey into a vibrant tapestry of intelligent possibilities
            and discover how technology empowers the world, one connection at a
            time!
          </p>

          <img
            data-aos="fade-up-right"
            src={image5}
            className="md:ml-[800px] md:mt-[-520px] w-fit h-[200px] relative top-[-500px] md:top-0 ml-12 rounded md:h-[500px]"
          />
        </div>
      </div>
    </>
  );
}
