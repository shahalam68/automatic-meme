import Link from "next/link";
import React, { useState, useEffect } from "react";

const HomeSlider = () => {
  // State to keep track of the current active slide
  const [currentSlide, setCurrentSlide] = useState(0); // Start from the first slide

  // Array of image URLs for each slide
  const images = [
    "https://i.ibb.co/RNrkGNY/396723353-380821564472510-3420629505396603627-n.jpg",
    "https://i.ibb.co/swNCyHV/391636175-368353785719288-6632421898154180740-n.jpg",
    "https://i.ibb.co/yXPBStd/394700727-374618305092836-6055408268252241086-n.jpg",
  ];

  // Array of text for each slide


  // Common button text
  const buttonText = "See All Sets";

  // Function to handle navigation to a specific slide
  const goToSlide = (slideIndex: any) => {
    setCurrentSlide(slideIndex);
  };

  // Function to handle navigation to the next slide
  const nextSlide = () => {
    setCurrentSlide((currentSlide + 1) % images.length); // Loop back to the first slide if at the end
  };

  // Function to handle navigation to the previous slide
  const prevSlide = () => {
    setCurrentSlide((currentSlide - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, [currentSlide]);

  return (
    <div className="carousel w-full relative overflow-hidden">
      <div
        className="carousel-item relative flex transition-transform duration-500 ease-in-out"
        style={{
          transform: `translateX(-${currentSlide * 100}%)`,
        }}
      >
        {images.map((image, index) => (
          <div key={index} className="w-full h-[400px]  flex-shrink-0 relative">
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover opacity-70"
            />
            <div className="absolute inset-0 flex flex-col justify-center items-center ">
              
              <Link href="/sets">
              <button className="border-2 border-yellow-500 text-lg hover:border-yellow-500 rounded-lg px-4 py-2 mt-20 font-bold text-gray-800 hover:bg-yellow-500 transition duration-300 ease-in-out">
                {buttonText}
              </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className="absolute bottom-5 left-0 right-0 mx-auto flex justify-center">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full mx-1 bg-gray-500 ${
              currentSlide === index ? "bg-white" : ""
            }`}
            onClick={() => goToSlide(index)}
          ></button>
        ))}
      </div>
      <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
        <button className="btn btn-circle" onClick={prevSlide}>
          ❮
        </button>
        <button className="btn btn-circle" onClick={nextSlide}>
          ❯
        </button>
      </div>
    </div>
  );
};

export default HomeSlider;
