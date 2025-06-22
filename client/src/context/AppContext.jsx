import { dummyCourses } from "../assets2/assets";
import { createContext, useEffect, useState } from "react";
export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const currency = import.meta.env.VITE_CURRENCY;
  const [allCourses, setAllCourses] = useState([]);
  const fetchAllCourse = async () => {
    setAllCourses(dummyCourses);
  };

  const courseRate = (course) => {
    if (course.courseRatings.length == 0) return 0;

    let rate = 0;
    course.courseRatings.forEach((rating) => {
      rate+= rating.rating;
    });
    return rate / course.courseRatings.length;
  };

  useEffect(() => {
    fetchAllCourse();
  }, []);

  const value = {
    currency,
    allCourses,courseRate
  };

  return (
    <AppContext.Provider value={value }>{props.children}</AppContext.Provider>
  );
};
