import { assets } from "@/assets2/assets";
import React from "react";

export default function CallToAction() {
  return (
    <div className=" max-w-5xl mx-auto space-y-3 mt-6">
      <div className="font-semibold text-xl md:text-3xl text-center">
        <h1>Learn anything , anytime and anywhere</h1>
      </div>

      <div className="text-sm md:text-xl text-gray-400 text-center">
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Numquam, laudantium. Lorem Lorem.</p>
      </div>
      <div className=" gap-4 mt-10 mb-5 flex justify-center">
        <button className="text-white bg-blue-700 px-4 py-2 rounded  hover:bg-blue-800">Get started</button>
        <button className="text-black bg-gray-100 px-4 py-2 flex gap-x-2 rounded hover:bg-gray-50"> Learn more <img src={assets.arrow_icon}/></button>

      </div>
    </div>
  );
}
