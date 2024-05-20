import React from "react";
import ActiveSlider from "./ActiveSlider";

const Featured = () => {
  return (
    <>
      <div className="text-center mt-12   ">
        <h1 className=" text-4xl font-medium mb-12 text-gray-700">
          Today's Featured Cards!
        </h1>
        {/* <hr className="border-b-2 border-black w-[50px] " /> */}

        <ActiveSlider />
        <h1 className=" text-4xl font-medium mb-12  text-gray-700">Shop Now</h1>
      </div>
    </>
  );
};

export default Featured;
