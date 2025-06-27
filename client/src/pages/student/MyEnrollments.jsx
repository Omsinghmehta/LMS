import { AppContext } from "@/context/AppContext";
import React, { useContext, useState } from "react";
import { Line } from "rc-progress";
export default function MyEnrollments() {
  const { enrolledCourses, calculateCourseTime,navigate } = useContext(AppContext);
  const [progressArray,setProgressArray]=useState([
  { lecturesCompleted: 1, totalLectures: 5 },
  { lecturesCompleted: 2, totalLectures: 4 },
  { lecturesCompleted: 4, totalLectures: 4 },
  { lecturesCompleted: 0, totalLectures: 3 },
  { lecturesCompleted: 5, totalLectures: 5 },
  { lecturesCompleted: 2, totalLectures: 6 },
  { lecturesCompleted: 3, totalLectures: 7 },
  { lecturesCompleted: 1, totalLectures: 2 },
  { lecturesCompleted: 4, totalLectures: 5 },
  { lecturesCompleted: 6, totalLectures: 6 },
  { lecturesCompleted: 2, totalLectures: 3 },
  { lecturesCompleted: 0, totalLectures: 4 },
  { lecturesCompleted: 5, totalLectures: 8 },
  { lecturesCompleted: 7, totalLectures: 10 }
]
)
  return (
    <div className="px-8 md:px-36 md:py-12 pt-10  min-h-screen bg-white">
      <h1 className="text-2xl font-bold">My Enrollments</h1>
      <table className="border w-full mt-10 border-gray-300 ">
        <thead className="md:table-auto max-sm:hidden border-b text-left overflow-hidden border-gray-400/75 text-sm bg-gray-100">
          <tr>
            <th className="px-4 py-3 font-semibold truncate ">Course</th>
            <th className="px-4 py-3 font-semibold truncate">Duration</th>
            <th className="px-4 py-3 font-semibold truncate">Completed</th>
            <th className="px-4 py-3 font-semibold truncate">Status</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {enrolledCourses.map((course, i) => (
            <tr key={i} className="border-b border-gray-300">
              <td className="flex space-x-3 px-2 md:px-4 md:py-3 py-2 items-center">
                <img src={course.courseThumbnail} alt="thumbnail" className=" w-14 sm:w-24 md:w-28"/>
                <div className="flex-1">
                  <p className="max-sm:text-sm mb-1"> {course.courseTitle} </p>
                  <Line strokeWidth={2} percent={progressArray[i].lecturesCompleted/progressArray[i].totalLectures*100 } className="bg-gray-300 rounded-full"/>
                </div>
              </td>
              <td className="px-4 py-3 max-sm:hidden">{calculateCourseTime(course)}</td>
              <td>
                <div className="px-4 py-3 max-sm:hidden">
                  {progressArray[i] && `${progressArray[i].lecturesCompleted} / ${progressArray[i].totalLectures}`} <span>Lectures</span>
                </div>
              </td >
              <td className="px-4 py-3 max-sm:text-right">
                <button onClick={()=>{navigate('/player/'+course._id)}} className="px-3 sm:px-5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded max-sm:text-xs">{(progressArray[i] && `${progressArray[i].lecturesCompleted}`===`${progressArray[i].totalLectures}`)?'Completed':'Ongoing'}</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
