import Loading from "@/components/student/Loading";
import { AppContext } from "@/context/AppContext";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function MyCourses() {
  const { currency, getToken,isEducator,backendUrl } = useContext(AppContext);
  const [courses, setCourses] = useState(null);


 const fetchEducatorCourses=async()=>{
    try {
      const token =await getToken();
      const {data}=await axios.get(`${backendUrl}/api/educator/courses`,{headers:{Authorization:`Bearer ${token}`}});

    if (data.success) {
      setCourses(data.courses);
    } else {
      toast.error(data.message || "Could not fetch courses");
    }
    } catch (error) {
      toast.error(error.message)
    }
 }
 
  useEffect(() => {
    if(isEducator)
    fetchEducatorCourses();
  }, [isEducator]);

  return courses ? (
    <div>
      <div className="md:p-8  pt-8 pb-0 p-4 h-screen flex flex-col ">
        <h2 className="font-medium text-lg pb-4">My Courses</h2>
        <div className="flex flex-col rounded border border-gray-500/25 text-center max-w-4xl">
          <table className="w-full  overflow-hidden table-fixed md:table-auto">
            <thead className="border-b border-gray-500/20 text-sm text-left">
              <tr>
                <th className="px-4 py-3 font-semibold truncate">
                  All courses
                </th>
                <th className="px-4 py-3 font-semibold truncate">Earnings</th>
                <th className="px-4 py-3 font-semibold truncate">Students</th>
                <th className="px-4 py-3 font-semibold truncate">
                  Published On
                </th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-500 text-left">
              {courses?.map((course, idx) => (
                <tr key={idx} className="border-b border-gray-500/20">
                  <td className="md:px-4 py-3 pl-2 md:pl-4 truncate space-x-3 flex items-center ">
              {course?.courseThumbnail ? (
                <img src={course.courseThumbnail} className="w-16" />
              ) : (
                <div className="w-16 h-10 bg-gray-200 flex items-center justify-center text-xs text-gray-500">
                  No Image
                </div>
              )}     
               <span className="truncate hidden md:block">
                      {course?.courseTitle}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {currency}
                    {(
                      (course?.enrolledStudents?.length || 0) * ((course?.coursePrice || 0) - ((course?.discount || 0) * (course?.coursePrice || 0)) / 100)).toFixed(0)}
                  </td>
                  <td className="px-4 py-3 ">
                    {course?.enrolledStudents?.length || 0}
                  </td>
                  <td className=" md:px-4 py-3 ">
                    {new Date(course.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
}
