import React, { useEffect, useState } from "react";
import { assets, dummyDashboardData } from "@/assets2/assets";
import Loading from "@/components/student/Loading";

export default function DashBoard() {
  const { currency } = useState();
  const [dashBoardData, setDashBoardData] = useState(null);

  const fetchDashboardData = async () => {
    setDashBoardData(dummyDashboardData);
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return dashBoardData ? (
    <div className="min-h-screen text-gray-500 ">
      <div className="flex items-center md:p-10 gap-5 p-5 flex-wrap">

        <div className="flex gap-3 border-2 border-blue-400/90 p-2 rounded md:p-4 w-fit">
          <div>
            <img src={assets.patients_icon} alt="" className="max-sm:w-10 max-sm:h-10"/>
          </div>
          <div className="text-black">
            <h1 className="text-md md:text-2xl font-semibold">{dashBoardData.enrolledStudentsData.length}</h1>
            <p className="text-sm md:text-md text-gray-500">Total Enrollments</p>
          </div>
        </div>

      <div className="flex gap-3 border-2 border-blue-400/90 p-2 rounded md:p-4 w-fit">
          <div>
            <img src={assets.appointments_icon} alt="" className="max-sm:w-10 max-sm:h-10"/>
          </div>
          <div className="text-black">
            <h1 className="text-md md:text-2xl font-semibold">{dashBoardData.totalCourses}</h1>
            <p className="text-sm md:text-md text-gray-500">Total Courses</p>
          </div>
        </div>

        <div className="flex gap-3 border-2 border-blue-400/90 p-2 rounded md:p-4 w-fit">
          <div>
            <img src={assets.earning_icon} alt="" className="max-sm:w-10 max-sm:h-10"/>
          </div>
          <div className="text-black">
            <h1 className="text-md md:text-2xl font-semibold">{dashBoardData.totalEarnings}</h1>
            <p className="text-sm md:text-md text-gray-500">Total Earnings</p>
          </div>
        </div>
      </div>

      {/* second */}

      <div className="md:p-10 gap-5 p-5">
        <h2 className="font-medium text-lg pb-4">Latest Enrollments</h2>
        <div className="flex flex-col rounded border border-gray-500/25 text-center max-w-4xl"> 

          <table className="w-full  overflow-hidden table-fixed md:table-auto">
            
            <thead className="border-b border-gray-500/20 text-sm text-left">
            <tr>

            <th className="px-4 py-3 font-semibold hidden sm:table-cell"> #</th>
            <th className="px-4 py-3 font-semibold">Student Name</th>
            <th className="px-4 py-3 font-semibold">Course Title</th>

            </tr>

            </thead>
            <tbody className="text-sm text-gray-500 text-left">
              {
                dashBoardData.enrolledStudentsData.map((item,idx)=>(
                  <tr key={idx} className="border-b border-gray-500/20">
                    <td className="px-4 py-3 truncate font-semibold hidden sm:table-cell ">{idx+1}</td>
                    <td className="px-4 py-3 truncate space-x-3 flex items-center">
                      <img src={item.student.imageUrl} 
                      className="w-9 h-9 rounded-full"/>
                      <span className="truncate">{item.student.name}</span>
                    </td>
                    <td className="px-4 py-3 truncate">{item.courseTitle}</td>
                  </tr>
                
                ))
              }
            </tbody>
          </table>
          
        </div>

      </div>

    </div>
  ) : (
    <Loading />
  );
}
