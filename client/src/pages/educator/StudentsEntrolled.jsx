import React, { useContext, useEffect, useState } from 'react';
import Loading from '@/components/student/Loading';
import { AppContext } from '@/context/AppContext';
import { toast } from 'react-toastify';
import axios from 'axios';

export default function StudentsEntrolled() {
  const [enrolledStudentData,setEnrolledStudentData]=useState(null);
    const { getToken,isEducator,backendUrl } = useContext(AppContext);
  

  const fetchData=async()=>{
    try {
      const token=await getToken();
      const {data}=await axios.get(`${backendUrl}/api/educator/enrolled-students`,{headers:{Authorization:`Bearer ${token}`}});
      if (data.success) {
        setEnrolledStudentData(data.enrolledStudents.reverse());
      } else {
        toast.error(data.message);
    }
   } catch (error) {
      toast.error(error.message)
  }
}

  useEffect(()=>{
    if(isEducator)
    fetchData();
  },[isEducator]);


  return enrolledStudentData?(
        <div className="md:p-8  pt-8 pb-0 p-4 h-screen flex flex-col ">
          <div className="flex flex-col rounded border border-gray-500/25 text-center max-w-4xl">
            <table className="w-full  overflow-hidden table-fixed md:table-auto">
              <thead className="border-b border-gray-500/20 text-sm text-left">
                <tr>
  
                  <th className="px-4 py-3 font-semibold hidden md:table-cell truncate">#</th>
                  <th className="px-4 py-3 font-semibold truncate">Student Name</th>
                  <th className="px-4 py-3 font-semibold truncate">Course Title</th>
                  <th className="px-4 py-3 font-semibold truncate hidden md:table-cell">Date</th>
  
                </tr>
              </thead>
              <tbody className="text-sm text-gray-500 text-left ">
                      {
                        enrolledStudentData.map((item,idx)=>(
                          <tr key={idx} className="border-b border-gray-500/20">
                            <td className="px-4 py-3 hidden  md:table-cell ">{idx+1}</td>
                            <td className="md:px-4 py-3 px-2 flex items-center  truncate space-x-3  ">
                              <img src={item.student.imageUrl} 
                              className="w-9 h-9 rounded-full "/>
                              <span className="truncate ">{item?.student?.name || 'xyz'}</span>
                            </td>
                              <td className="px-4 py-3   truncate">{item?.courseTitle || 'xyz'}</td>
                            <td className="px-4 py-3 hidden md:table-cell">{new Date(item?.purchaseDate || '12/7/2025').toLocaleDateString()}</td>
                          </tr>
                        
                        ))
                      }
                    </tbody>
            </table>
          </div>
        </div>
    ):<Loading/>;
}
