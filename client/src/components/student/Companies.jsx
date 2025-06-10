import React from "react";
import logo1 from "../../assets/microsoft.png";
import logo2 from "../../assets/wallmart.png";
import logo3 from "../../assets/paypal.png";
import logo4 from "../../assets/adobe.png";
import logo5 from "../../assets/acc.png";

export default function Companies() {
  return (
    <div className=" md:mt-20 max-w-6xl mx-auto container px-4 py-8">
      <p className="text-gray-500 items-center text-center text-sm md:text-base">Trusted By Learners From</p>
        <div className="flex flex-wrap justify-center gap-6 items-center">
        <img src={logo1} alt="adobe" className="w-24 md:w-32" />
        <img src={logo2} alt="merk" className="w-24 md:w-32" />
        <img src={logo3} alt="paypal" className="w-24 md:w-32" />
        <img src={logo4} alt="adobe" className="w-24 md:w-32" />
        <img src={logo5} alt="adobe" className="w-24 md:w-32 mb-3 md:mb-3" />
      </div>
    </div>
  );
}
