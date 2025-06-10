import { assets } from "@/assets2/assets";
import { AppContext } from "@/context/AppContext";
import React, { useContext } from "react";
export default function CourseCard({ course }) {
  const { currency } = useContext(AppContext);

  return (
    <div className=" rounded-xl border-1 border-gray-300">
      <img className="rounded-xl" src={course?.courseThumbnail} />
      <div className="md:space-y-1 md:px-3 md:py-3 px-2 py-2">
        <h2 className="font-bold text-sm">{course?.courseTitle}</h2>

        <p className="text-sm">{course?.educator?.name}</p>
        <div className="flex items-center space-x-2 text-sm">
          <p>4.5</p>
          <div className="flex ">
            {[...Array(5)].map((_, i) => (
              <img src={assets.star} className="w-3.5 h-3.5 " alt="img" />
            ))}
          </div>
          <p>22</p>
        </div>
        <p className="font-semibold text-sm">
          {currency}
          {(
            course?.coursePrice -
            (course?.discount * course?.coursePrice) / 100
          ).toFixed(2)}
        </p>
      </div>
    </div>
  );
}
