import React from "react";
import { Typewriter } from "react-simple-typewriter";

export default function Hero() {
  return (
      <div className=" md:max-w-2xl max-w-xl mx-auto px-3  md:px-8 items-center ">
        <h1 className="font-bold md:text-4xl text-2xl md:max-w-2xl  h-[100px]   md:h-auto">
          Learn Skills and Build a Successful <br/>Career
          with{" "}
          <span className="text-blue-600 font-bold ">
            <Typewriter
              words={[
                "Hands-On Projects",
                "Expert Mentorship",
                "Job-Ready Skills",
                "Interview Preparation",
                "Real-World Experience",
              ]}
              loop={true}
              cursor
              cursorStyle="|"
              typeSpeed={80}
              deleteSpeed={50}
              delaySpeed={1800}
            />
          </span>
        </h1>  <p className="mt-4 text-gray-700 text-sm md:text-base text-center max-w-xl  ">
  Learn new skills, grow with confidence, and take the next step in your journey — all at your own pace with 
  skills that will help you .
</p>
      </div>
  );
}
