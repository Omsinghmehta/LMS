import React from "react";
import logo from "../../assets/lfy.png";

export default function Footer() {
  return (
    <div className="bg-gray-900 grid grid-cols-1 mx-auto md:grid-cols-3  py-6 mt-30 ">
      <div className="flex flex-col px-32 gap-y-5 ">
        <p className="h-20 w-30 ">
          <img src={logo} />
        </p>
        <p className="text-white/65 ">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsum at que
          vero dolorem! Suscipit, facilis corporis! ullam.
        </p>
      </div>

      <div className=" px-32 py-10 space-y-4">
        <h1 className="text-white text-xl gap-y-2">Company</h1>
        <div className="flex flex-col text-white/65 ">
          <ul className="space-y-1 underline">
            <li>
              <a href="&">Home</a>
            </li>
            <li>
              <a href="&">About us</a>
            </li>
            <li>
              <a href="&">Contact us</a>
            </li>
            <li>
              <a href="&">Privacy policy</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="flex flex-col gap-y-5 px-32 py-10">
        <h1 className="text-white text-xl">Subscribe to newsletter</h1>
        <div className="text-white/65">
          The latest news, article and resources, sent to your inbox weekly
        </div>
          <input
            type="text"
            placeholder="Enter your email"
            className="py-1 px-1 text-xs text-center md:text-xl md:py-3 md:px-2 rounded bg-gray-600"
          />
          <button className="text-white bg-blue-900 px-2 py-1 md:px-4 md:py-2 rounded text-xs md:text-xl">
            Subscribe
          </button>
      </div>

      <div className="text-white/65 w-[100vw] text-center space-y-4 text-sm md:text-xl">
        <hr/>
        <p>Copyright 2025 &copy; Learnify. All Right Reserved</p>
      </div>
    </div>
  );
}
