import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserCircle } from "lucide-react";
import { useUser, useClerk, UserButton } from "@clerk/clerk-react";
import { assets } from "@/assets2/assets";
import { AppContext } from "@/context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

 export default function Navbar() {

  const {navigate,isEducator,backendUrl,setIsEducator,getToken}=useContext(AppContext);

  const isCourseListPage = location.pathname.includes("/courses-list");

  const { openSignIn } = useClerk();
  const { user } = useUser();
  const becomeEducator=async()=>{
    try {
      if(isEducator)
      {
        navigate('/educator');
        return;
      }

      const token=await getToken();
      const {data}=await axios.get(`${backendUrl}/api/educator/update-role`,{headers:{Authorization:`Bearer ${token}`}});
      if(data.success)
      {
        setIsEducator(true);
        toast.success(data.message)
      }else{
        toast.error(data.message)
      }
    } catch (error) {
        toast.error(error.message)
      
    }
  }
  return (
    <div
      className={` h-20 flex  items-center border-b border-gray-500 px-5  sm:px-22 lg:px-34  justify-between ${
        isCourseListPage ? "bg-white" : "bg-cyan-200/45"
      }`}
    > 
    <Link to={"/"}> <img src={assets.learnify} alt="Logo" className="w-auto h-30 md:h-45 cursor-pointer" /> </Link>
       <div className=" hidden md:flex items-center gap-5 text-gray-500 ">
        <div className="flex items-center gap-5">
          {user && (
            <>
              <button className="text-gray-500" onClick={becomeEducator}>{isEducator?'Educator Dashboard':'Become Educator'}</button>|
              <Link to={"/my-enrollments"}> My Enrollments</Link>
            </>
          )}
        </div>
        {user ? (
          <UserButton />
        ) : (
          <button
            onClick={() => openSignIn()}
            className="text-white px-5 py-2 bg-blue-700 hover:bg-blue-600 cursor-pointer rounded-full"
          >
            Create Account
          </button>
         
        )}
      </div>
      {/* for mobile view */}
      <div className="md:hidden flex items-center  ">
        <div className="flex items-center text-xs gap-x-2">
          {user && (
            <>
              <button className="text-gray-500"  onClick={becomeEducator}>{isEducator?'Educator Dashboard':'Become Educator'}</button>|
              <Link to={"/my-enrollments"}> My Enrollments</Link>
               
            </>
          )}
          <UserCircle  onClick={() => openSignIn()}/>
        </div>
      </div>
    </div>
  );
}
