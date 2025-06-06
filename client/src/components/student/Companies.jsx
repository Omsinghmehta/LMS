import React from "react";
import logo1 from "../../assets/microsoft.png";
import logo2 from "../../assets/wallmart.png";
import logo3 from "../../assets/paypal.png";
import logo4 from "../../assets/adobe.png";
import logo5 from "../../assets/acc.png";

export default function Companies() {
  return (
    <div className="animate-scroll mt-20">
      <p className="text-gray-500 items-center mb-5 ml-45 text-[1rem]">Trusted By Learners From</p>
      <div className="flex gap-6 items-center ">
        <img src={logo1} alt="adobe" width="110" height="110" />
        <img src={logo2} alt="merk" width="110" height="110" />
        <img src={logo3} alt="paypal" width="110" height="110" />
        <img src={logo4} alt="adobe" width="110" height="110" />
        <img src={logo5} alt="adobe" width="110" height="110" className="mb-3"/>
      </div>
    </div>
  );
}
