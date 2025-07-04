import Loading from "@/components/student/Loading";
import { AppContext } from "@/context/AppContext";
import React, { useContext, useEffect, useState } from "react";

export default function MyCourses() {
  const {allCourses,currency}=useContext(AppContext);
  const [courses,setCourses]=useState(null);

  const fetchCourseData=()=>{
    setCourses(allCourses);
  }

  useEffect(()=>{
    fetchCourseData();
  },[]);

  return courses?(
    <div>
      <div className="md:p-8  pt-8 pb-0 p-4 h-screen flex flex-col ">
        <h2 className="font-medium text-lg pb-4">My Courses</h2>
        <div className="flex flex-col rounded border border-gray-500/25 text-center max-w-4xl">
          <table className="w-full  overflow-hidden table-fixed md:table-auto">
            <thead className="border-b border-gray-500/20 text-sm text-left">
              <tr>

                <th className="px-4 py-3 font-semibold truncate">All courses</th>
                <th className="px-4 py-3 font-semibold truncate">Earnings</th>
                <th className="px-4 py-3 font-semibold truncate">Students</th>
                <th className="px-4 py-3 font-semibold truncate">Published On</th>

              </tr>
            </thead>
            <tbody className="text-sm text-gray-500 text-left">
                    {
                      courses.map((course,idx)=>(
                        <tr key={idx} className="border-b border-gray-500/20">
                          <td className="md:px-4 py-3 pl-2 md:pl-4 truncate space-x-3 flex items-center ">
                            <img src={course.courseThumbnail} 
                            className="w-16 "/>
                            <span className="truncate hidden md:block">{course.courseTitle}</span>
                          </td>
                            <td className="px-4 py-3  ">{currency}
                               {Math.floor(course.enrolledStudents.length*(course.coursePrice-course.discount*course.coursePrice/100))}
                            </td>
                          <td className="px-4 py-3 ">{course.enrolledStudents.length}</td>
                          <td className=" md:px-4 py-3 ">{new Date(course.createdAt).toLocaleDateString()}</td>
                        </tr>
                      
                      ))
                    }
                  </tbody>
          </table>
        </div>
      </div>
    </div>
  ):<Loading/>;
}
