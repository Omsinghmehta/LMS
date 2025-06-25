import SearchBar from "@/components/student/SearchBar";
import { AppContext } from "../../context/AppContext";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CourseCard from "@/components/student/CourseCard";
import Footer from "@/components/student/Footer";
import { assets } from "@/assets2/assets";

export default function CoursesList() {
  const { navigate, allCourses } = useContext(AppContext);
  const { input } = useParams();
  const [filterCards,setfilterCard]=useState([]);

  useEffect(()=>{
    if( allCourses.length>0){
      input?setfilterCard(allCourses.filter((course)=>(course.courseTitle.toLowerCase().includes(input.toLowerCase())))):setfilterCard(allCourses)
    }
  },[allCourses,input])
  return (
    <div>
      <div className="flex flex-col items-center md:flex-row justify-between  max-w-8xl  mx-auto w-full mt-10 ">
        <div className="mt-10 px-22 md:px-32 md:relative left-4">
          <h1 className="text-3xl font-semibold "> Courses List </h1>
          <p>
            <span
              onClick={() => navigate("/")}
              className=" cursor-pointer text-blue-500"
            >
              Home{" "}
            </span>
            /<span className=" cursor-pointer text-gray-500"> Course-list</span>
          </p>
        </div>
        <div className=" flex w-fit md:relative right-30 ">
          <SearchBar data={input} />
        </div>
      </div>
        
        <div className=" px-10 md:px-30  mt-7  ">

        {
          input && <div className="w-fit px-2 md:px-4 rounded-full text-sm bg-gray-100 py-1 md:py-2 flex gap-2 md:gap-4 text-gray-800 border ">
            <p>{input}</p>
            <img src={assets.cross_icon} className="cursor-pointer" onClick={()=>navigate('/courses-list')}/>
          </div>
        }

        </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3  px-10 md:px-30  mt-16">
        {filterCards.map((course, idx) => (
          <CourseCard course={course} key={idx} />
        ))}
      </div>
      <Footer/>
    </div>
  );
}
