import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/lfy.png";
import { UserCircle } from "lucide-react";
import { useUser, useClerk, UserButton } from "@clerk/clerk-react";
 export default function Navbar() {
  const isCourseListPage = location.pathname.includes("/courses-list");
  const { openSignIn } = useClerk();
  const { user } = useUser();
  return (
    <div
      className={` h-20 flex  items-center border-b border-gray-500 px-5  sm:px-24 lg:px-36  justify-between ${
        isCourseListPage ? "bg-white" : "bg-cyan-100/60"
      }`}
    > 
    <Link to={"/"}> <img src={logo} alt="Logo" className="w-auto h-30 cursor-pointer" /> </Link>
       <div className=" hidden md:flex items-center gap-5 text-gray-500 ">
        <div className="flex items-center gap-5">
          {user && (
            <>
              <button className="text-gray-500">Become Educator</button>|
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
      <div className="md:hidden flex items-center gap-2">
        <div className="flex items-center gap-5">
          {user && (
            <>
              <button className="text-gray-500">Become Educator</button>|
              <Link to={"/my-enrollments"}> My Enrollments</Link>
               
            </>
          )}
          <UserCircle />
        </div>
      </div>
    </div>
  );
}
