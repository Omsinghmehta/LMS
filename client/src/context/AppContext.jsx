import { dummyCourses } from "../assets2/assets";
import { createContext, useEffect, useState } from "react";
export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const currency = import.meta.env.VITE_CURRENCY;
  const [allCourses, setAllCourses] = useState([]);
  const fetchAllCourse = async () => {
    setAllCourses(dummyCourses);
  };

  useEffect(() => {
    fetchAllCourse();
  }, []);
  const value = {
    currency,
    allCourses,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
