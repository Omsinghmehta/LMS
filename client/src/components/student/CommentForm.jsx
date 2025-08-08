import { AppContext } from "@/context/AppContext";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function CommentForm({courseId , isEnrolled}) {

  if(!isEnrolled) return;
  console.log(isEnrolled)
  const {backendUrl,getToken} =useContext(AppContext);
  const [comment, setComment] = useState("");
  async function handlesubmit(e) {
    try{
    e.preventDefault();
    const token=await getToken();
    const {data}=await axios.post(`${backendUrl}/api/user/add-comment`,{courseId,comment},{headers:{Authorization:`Bearer ${token}`}});
    if(data.success){
        toast.success("Comment Posted");
      }
    }catch(error){
        toast.error(error.message);
    }
    finally{
    setComment("");


  }
}

  return (
    <div>
      <form onSubmit={handlesubmit} className="space-y-2 ">
        <textarea
          placeholder="Write Your Comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
          className="w-full p-4 border rounded focus:outline-none"
        />
        <button className="px-4 py-2 text-white bg-black rounded hover:bg-gray-700 cursor-pointer onfocus:outline-none">Comment</button>
      </form>
    </div>
  );
}
