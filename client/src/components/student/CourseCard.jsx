import { assets } from "@/assets2/assets";
import { AppContext } from "@/context/AppContext";
import React, { useContext } from "react";
export default function CourseCard({ course }) {
  const { currency,courseRate,navigate,} = useContext(AppContext);

  return (
    <div className=" rounded-md border-1 transition-transform duration-300 hover:scale-105  cursor-pointer border-gray-400" onClick={()=>navigate(`course/${course._id}`)}>
      <img className="rounded-t-md" src={course?.courseThumbnail} />
      <div className="md:space-y-1 md:px-3 md:py-3 px-2 py-2">
        <h2 className="font-bold text-sm">{course?.courseTitle}</h2>

        <p className="text-sm">{'Learnify'}</p>
        <div className="flex items-center space-x-2 text-sm">
          <p>{courseRate(course)}</p>
          <div className="flex ">
            {[...Array(5)].map((_, i) => (
              <img src={i<Math.floor(courseRate(course))?assets.star:assets.star_blank} className="w-3.5 h-3.5 " alt="img" />
            ))}
          </div>
          <p>{course.courseRatings.length}</p>
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
