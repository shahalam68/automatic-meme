import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import { Autoplay, Pagination } from "swiper/modules"; // Import Autoplay and Pagination
import { RxArrowTopRight } from "react-icons/rx";
import { ServiceData } from "../constants/constants"; // Replace with your actual data

const ActiveSlider = () => {
  return (
    <div className="flex items-center justify-center flex-col">
      <Swiper
        breakpoints={{
          0: {
            slidesPerView: 1,
            spaceBetween: 15,
          },
          340: {
            slidesPerView: 2,
            spaceBetween: 15,
          },
          700: {
            slidesPerView: 3,
            spaceBetween: 15,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 15,
          },
        }}
        
        freeMode={true}
        autoplay={{
          delay: 5000, // Set the delay in milliseconds (e.g., 5 seconds)
        }}
        modules={[Autoplay, Pagination]} // Enable Autoplay and Pagination
        className="max-w-[98%] mb-20 lg:max-w-[85%]"
      >
        {ServiceData.map((item, index) => (
          <SwiperSlide key={item.backgroundImage}>
            <div className="flex flex-col  shadow-lg text-white px-6 py-8 h-[300px] w-[100px]  cursor-pointer">
              
              <div className="absolute inset-0 bg-cover bg-center rounded-lg overflow-hidden ">
                <img className=" transition duration-300 ease-in-out hover:scale-110" src={item.backgroundImage} alt="" />
              </div>
              {/* Add other content for each slide */}
              
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ActiveSlider;
