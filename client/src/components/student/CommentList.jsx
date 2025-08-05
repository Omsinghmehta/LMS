import { AppContext } from '@/context/AppContext';
import axios from 'axios';
import { CalendarRange, LucideUserRoundPen, MessageSquareTextIcon } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react'

export default function CommentList({ courseId }) {

 const [comments,setComments]=useState([]);
 const {backendUrl,getToken} =useContext(AppContext);
 useEffect( ()=>{
      const fetchComments = async () => {
      try {
        const token=await getToken();
        const { data } = await axios.get(`${backendUrl}/api/course/comment/${courseId}`,{},{headers:{Authorization:`Bearer ${token}`}});
        if (data.success) {
          setComments(data.comments);  
        } else {
          toast.error("Error fetching comments");
        }
      } catch (err) {
        toast.error("Failed to load comments");
      }
    }
    fetchComments();
 },[courseId])
 if(!comments.length)
    return <div className='mt-7 p-3 my-2 rounded border bg-gradient-to-b from-gray-150 to-gray-200'>No Feedback Available Now</div>

  return (
    <div className='mt-7 w-fit h-fit  overflow-y-scroll'>
        <h2 className='font-semibold text-xl  '>Students Comments <MessageSquareTextIcon/></h2>
        {
            comments?.map((c,idx)=>(
                <div className="p-3 my-2 rounded border bg-gradient-to-b from-gray-150 to-gray-200" key={idx}>

                    <p className='font-bold flex gap-x-2'><LucideUserRoundPen/> {c?.userName}:</p>
                    <p className='my-2'> {c?.comment}</p>
                    <p className='text-sm text-gray-500  flex gap-x-2'><CalendarRange/>{new Date(c?.createdAt).toLocaleDateString()}</p>

                </div>
            ))
        }
    </div>
  )
}
