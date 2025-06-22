import { assets, dummyTestimonial } from "@/assets2/assets";
import React from "react";

export default function TestimonialSection() {
  return (
    <div className="   space-y-2 text-center ">
      <h1 className="text-3xl text-gray-800">Testimonials</h1>
      <div className="md:text-base mt-3 text-gray-500">
        Hear from our learners as they have share their journey of
        transformations, success, and how our <br /> plateform has made a
        difference in thier life.
      </div>
      <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mx-auto gap-8 max-w-6xl mt-14 ">
        {dummyTestimonial.map((data, index) => (
          <div className="   border border-gray-300 m-8 rounded ">
            <div key={index} className="flex gap-x-4 bg-gray-300/40 py-3 px-4">
              <img
                src={data.image}
                alt="image"
                className="h-12 w-12 rounded-full"
              />
              <div className="flex flex-col gap-y-2 ">
                <h1 className="text-lg font-semibold">{data?.name}</h1>
                <p className="text-gray-700 text-md">{data?.role}</p>
              </div>
            </div>
            <div className="flex flex-col gap-y-3 space-x-4 p-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <img
                    className="h-5 w-5 mt-2"
                    src={
                      i < Math.floor(data?.rating)
                        ? assets.star
                        : assets.star_blank
                    }
                  />
                ))}
              </div>
              <div className="mb-4">
                <p className="text-gray-700 text-left italic border-l-4 border-blue-400 pl-4">
                  “{data.feedback}”
                </p>
              </div>

              <div className="text-blue-600 text-left">
                <a href="#">Read More...</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
