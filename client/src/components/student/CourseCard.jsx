import { assets } from "@/assets2/assets";
import { AppContext } from "@/context/AppContext";
import React, { useContext } from "react";
import Loading from "./Loading";

export default function CourseCard({ course }) {
  const { currency, courseRate, navigate } = useContext(AppContext);

  // ⚠️ Prevent rendering if course data is invalid
  if (!course || !course._id || !course.coursePrice) return <Loading/>;

  const discountedPrice = (
    course.coursePrice -
    ((course.discount || 0) * course.coursePrice) / 100
  ).toFixed(2);

  const ratingValue = Math.floor(courseRate?.(course) || 0);
  const ratingCount = course?.courseRatings?.length || 0;

  return (
    <div
      className="rounded-md border-1 transition-transform duration-300 hover:scale-105 cursor-pointer border-gray-400"
      onClick={() => navigate(`course/${course._id}`)}
    >
      <img className="rounded-t-md" src={course.courseThumbnail || assets.defaultThumbnail} alt="thumbnail" />
      <div className="md:space-y-1 md:px-3 md:py-3 px-2 py-2">
        <h2 className="font-bold text-sm">{course.courseTitle || "Untitled Course"}</h2>
        <p className="text-sm">{course?.educator?.name || "Unknown Educator"}</p>
        <div className="flex items-center space-x-2 text-sm">
          <p>{courseRate?.(course) || 0}</p>
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <img
                key={i}
                src={i < ratingValue ? assets.star : assets.star_blank}
                className="w-3.5 h-3.5"
                alt="star"
              />
            ))}
          </div>
          <p>({ratingCount})</p>
        </div>
        <p className="font-semibold text-sm">
          {currency}
          {discountedPrice}
        </p>
      </div>
    </div>
  );
}
