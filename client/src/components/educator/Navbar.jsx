import React from "react";
import { assets, dummyEducatorData } from "@/assets2/assets";
import { UserButton, useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const educatorData = dummyEducatorData;
  const { user } = useUser();
  return (
    <div className="h-20 flex items-center justify-between px-4 sm:px-10 lg:px-15  py-0 text-gray-500 border-b ">
      <Link to="/">
        <img src={assets.learnify} alt="logo" className="w-auto h-30 md:h-45 cursor-pointer" />
      </Link>

      <div className="flex items-center text-gray-500 gap-5">
        <p>Hi! {user ? user.fullName : "Developer"}</p>
        {user?<UserButton/>:<img className='max-w-8' src={assets.profile_img}/>}
      </div>
    </div>
  );
}
