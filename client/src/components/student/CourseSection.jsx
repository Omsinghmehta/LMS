import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import CourseCard from "./CourseCard";
import Loading from "./Loading";

export default function CourseSection() {
  const { allCourses } = useContext(AppContext);
  console.log(allCourses)
  
  if(!allCourses ||allCourses.length==0) return <Loading/>

  return (
    <div className="py-16 px-8 max-w-9xl  space-y-6 ">
      <h2 className=" text-xl md:text-3xl text-center text-black  mx-auto max-w-xs">
        Learn from the best
      </h2>
      <p className="text-sm mt-3 text-gray-500 max-w-2xl text-center px-4 md:px-8 mx-auto">
        Discover our top-rated courses across various categories. From coding
        and design to business and wellness, our courses are crafted to deliver
        results.
      </p>

      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto items-center ">
        {allCourses.length > 0 &&
          allCourses
            .slice(0, 4)
            .map((course, idx) => <CourseCard key={idx} course={course} />)}
      </div>
      <div className=" text-center p-5">
        <Link
          to={"/courses-list"}
          onClick={() => scrollTo(0, 0)}
          className=" mt-20 item-center rounded mx-auto  text-sm text-gray-500 border-gray-500/30 px-5 py-2 md:py-3 md:px-10 border "
        >
          Show all courses
        </Link>
      </div>
    </div>
  );
}
