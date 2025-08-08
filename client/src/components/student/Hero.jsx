import React from "react";
import { Typewriter } from "react-simple-typewriter";

export default function Hero() {
  return (
    <div className="  md:max-w-2xl  mx-auto px-5 space-y-3  ">
      <h1 className="font-semibold md:font-bold md:text-4xl text-xl ">
        Learn Skills and Build a Successful Career with{" "}
        <span className="text-blue-600">
          <Typewriter
            words={[
              "Hands-On Projects",
              "Experts Courses",
              "Job-Ready Skills",
              "Interview Preparation",
            ]}
            loop={true}
            cursor
            cursorStyle="|"
            typeSpeed={80}
            deleteSpeed={50}
            delaySpeed={1800}
          />
        </span>
      </h1>{" "}
      <p className="lg:mt-4 text-gray-700 text-xs md:text-base text-center ">
        Learn new skills, grow with confidence, and take the next step in your
        journey — all at your own pace with skills that will help you .
      </p>
    </div>
  );
}
