import { AppContext } from "@/context/AppContext";
import React, { useContext, useEffect, useState } from "react";
import { Line } from "rc-progress";
import axios from "axios";
import { toast } from "react-toastify";
import Footer from "@/components/student/Footer";
export default function MyEnrollments() {
  const { enrolledCourses, calculateCourseTime,navigate,userData ,backendUrl,getToken,calculateNoOfLecture,fetchEnrolledCourses} = useContext(AppContext);

  const [progressArray,setProgressArray]=useState([])

  const getCourseProgress=async ()=>{ 
    try {
      const token=await getToken();
      const tempProgressArray=await Promise.all(
        enrolledCourses.map(async (course)=>{ 
          const {data}=await axios.post(`${backendUrl}/api/user/get-course-progress`,{courseId: course?._id},{headers:{authorization:`Bearer ${token}`}})
          let totalLectures=calculateNoOfLecture(course?.courseContent) || '0';
          const lecturesCompleted=data?.progress ? data.progress?.lectureCompleted?.length:0;
          return {totalLectures,lecturesCompleted}
        })
      )
    setProgressArray(tempProgressArray);
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    if(userData){
      fetchEnrolledCourses();
    }
  },[userData])


  useEffect(()=>{
    if(enrolledCourses.length>0){
      getCourseProgress();
    }
  },[enrolledCourses])

  if (enrolledCourses?.length === 0 || progressArray?.length==0 ) {
    return <p className="text-gray-500 text-center mt-10">No enrolled courses yet.</p>
  }

  return (<>
    <div className="px-8 md:px-36 md:py-12 pt-10  h-fit ">
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
          { enrolledCourses?.map((course, i) => (
            <tr key={i} className="border-b border-gray-300">
              <td className="flex space-x-3 px-2 md:px-4 md:py-3 py-2 items-center">
                <img src={course.courseThumbnail} alt="thumbnail" className=" w-14 sm:w-24 md:w-28"/>
                <div className="flex-1">
                  <p className="max-sm:text-sm mb-1"> {course?.courseTitle || 'xyz'} </p>
                  <Line strokeWidth={2} percent={progressArray[i]?.lecturesCompleted/progressArray[i]?.totalLectures*100 } className="bg-gray-300 rounded-full"/>
                </div>
              </td>
              <td className="px-4 py-3 max-sm:hidden">{calculateCourseTime(course)}</td>
              <td>
                <div className="px-4 py-3 max-sm:hidden">
                  {progressArray[i] && `${progressArray[i].lecturesCompleted || '0'} / ${progressArray[i].totalLectures || '0'}`} <span>Lectures</span>
                </div>
              </td >
              <td className="px-4 py-3 max-sm:text-right">
                <button onClick={()=>{navigate('/player/'+course._id)}} className="px-3 sm:px-5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded max-sm:text-xs">{(progressArray[i] && progressArray[i].lecturesCompleted===progressArray[i].totalLectures)?'Completed':'Ongoing'}</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  <Footer/>
  </>
  );
}
