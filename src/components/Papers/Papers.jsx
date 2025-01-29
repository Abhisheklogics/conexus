import React, { useRef } from "react";
import HTMLFlipBook from "react-pageflip";
import P1 from "../../../public/r_papers/P1.jpg";
import P2 from "../../../public/r_papers/P2.jpg";
import P3 from "../../../public/r_papers/P3.jpg";
import P4 from "../../../public/r_papers/P4.jpg";
import P5 from "../../../public/r_papers/P5.jpg";
import P6 from "../../../public/r_papers/P6.jpg";
import P7 from "../../../public/r_papers/P7.jpg";
import P8 from "../../../public/r_papers/P8.jpg";
import P9 from "../../../public/r_papers/P9.jpg";
import P10 from "../../../public/r_papers/P10.jpg";
import P11 from "../../../public/r_papers/P11.jpg";
import P12 from "../../../public/r_papers/P12.jpg";
import P13 from "../../../public/r_papers/P13.jpg";
import P14 from "../../../public/r_papers/P14.jpg";
import P15 from "../../../public/r_papers/P15.jpg";
import P16 from "../../../public/r_papers/P16.jpg";
import P17 from "../../../public/r_papers/P17.jpg";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"; // Importing arrow icons

// Single Page Component with Shadow Effect
const Page = React.forwardRef((props, ref) => {
  return (
    <div className="demoPage shadow-lg rounded-lg" ref={ref}>
      <img
        src={props.img}
        alt={`Page ${props.number}`}
        className="w-full h-[600px] mx-auto shadow-inner"
      />
    
    </div>
  );
});

function MyBook() {
  const bookRef = useRef();

  // Function to navigate the book
  const turnPage = (direction) => {
    if (direction === "next") {
      bookRef.current.pageFlip().flipNext();
    } else if (direction === "prev") {
      bookRef.current.pageFlip().flipPrev();
    }
  };

  return (
    <div className="relative flex justify-center w-full bg-gray-100 h-[700px] items-center md:mt-1  ">
      <HTMLFlipBook
        ref={bookRef}
        size="stretch"
        width={500} // Adjusted width
        height={600} // Adjusted height
        minWidth={315}
        maxWidth={500}
        minHeight={400}
        maxHeight={800}
        showCover={true}
        mobileScrollSupport={true}
        maxShadowOpacity={1}
        className="shadow-4xl text-black bg-white demo-book"
      >
        <Page number={1} img={P1} />
        <Page number={2} img={P2} />
        <Page number={3} img={P3} />
        <Page number={4} img={P4} />
        <Page number={5} img={P5} />
        <Page number={6} img={P6} />
        <Page number={7} img={P7} />
        <Page number={8} img={P8} />
        <Page number={9} img={P9} />
        <Page number={10} img={P10} />
        <Page number={11} img={P11} />
        <Page number={12} img={P12} />
        <Page number={13} img={P13} />
        <Page number={14} img={P14} />
        <Page number={15} img={P15} />
        <Page number={16} img={P16} />
        <Page number={17} img={P17} />
      </HTMLFlipBook>

      {/* Left Arrow Button */}
      <button
        className="absolute top-1/2 transform -translate-y-1/2 left-4 text-white bg-black p-4 rounded-full shadow-lg"
        onClick={() => turnPage("prev")}
      >
        <FaArrowLeft size={30} /> {/* Left Arrow Icon */}
      </button>

      {/* Right Arrow Button */}
      <button
        className="absolute top-1/2 transform -translate-y-1/2 right-4 text-white bg-black p-4 rounded-full shadow-lg"
        onClick={() => turnPage("next")}
      >
        <FaArrowRight size={30} /> {/* Right Arrow Icon */}
      </button>
    </div>
  );
}

export default MyBook;
