import { assets } from "@/assets2/assets";
import { AppContext } from "@/context/AppContext";
import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const { isEducator } = useContext(AppContext);
  const menuItem = [
    { name: "Dashboard", path: "/educator", icon: assets.home_icon },
    { name: "Add Course", path: "/educator/add-course", icon: assets.add_icon },
    {
      name: "My Courses",
      path: "/educator/my-courses",
      icon: assets.my_course_icon,
    },
    {
      name: "Student Enrolled",
      path: "/educator/student-enrolled",
      icon: assets.person_tick_icon,
    },
  ];
  return isEducator &&( <div className="flex flex-col md:w-64 w-16 border-r min-h-screen py-2 text-base text-gray-500">{
    menuItem.map((item,idx)=>(
      <NavLink to={item.path} key={idx} end={item.path==='/educator'} className={
        ({isActive})=>`flex md:justify-start items-center md:flex-row flex-col py-3.5 md:px-10 gap-3 ${isActive?'bg-indigo-50 border-r-[6px] border-indigo-500/95':' hover:bg-gray-100/90  border-white'}`}>
        <img src={item.icon} alt="img" className="w-6 h-6" />
        <p className="text-center md:block hidden">{item?.name}</p>
      </NavLink>
    ))
    }
    </div>
  );
}
