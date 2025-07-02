import { useNavigate } from "react-router-dom";
import { createContext, useEffect, useState } from "react";
import humanizeDuration from "humanize-duration";
import { dummyCourses } from "@/assets2/assets";
import { useAuth, useUser } from "@clerk/clerk-react";
export const AppContext = createContext();

export const AppContextProvider = (props) => {

  const navigate = useNavigate();
  const currency = import.meta.env.VITE_CURRENCY;
  const {getToken}=useAuth();
  const {user}=useUser();

  const [allCourses, setAllCourses] = useState([]);
  const [enrolledCourses,setEnrolledCourses]=useState([]);
  const [isEducator,setIsEducator]=useState(1);
  const fetchAllCourse = async () => {
    setAllCourses(dummyCourses);
  };

  const courseRate = (course) => {
    if (course.courseRatings.length == 0) return 0;

    let rate = 0;
    course.courseRatings.forEach((rating) => {
      rate += rating.rating;
    });
    return rate / course.courseRatings.length;
  };
  const calculateChapterTime = (chapter) => {
    let time = 0;
    chapter.forEach((lecture) => {
      time += lecture.lectureDuration;
    });
    return humanizeDuration(time * 60 * 1000, { units: ["h", "m"] });
  };
  const calculateCourseTime = (course) => {
    let time = 0;
    course.courseContent.forEach((chapter) =>
      chapter.chapterContent.forEach((lecture) => {
        time += lecture.lectureDuration;
      })
    );
    return humanizeDuration(time * 60 * 1000, { units: ["h", "m"] });
  };

  const calculateNoOfLecture = (courseContent) => {
    let totalLecture = 0;

    courseContent?.forEach((chapter) => {
      if (Array.isArray(chapter.chapterContent)) {
        totalLecture += chapter.chapterContent.length;
      }
    });

    return totalLecture;
  };

  const fetchEnrolledCourses=async ()=>{
   setEnrolledCourses(dummyCourses);
  }
  useEffect(() => {
    fetchAllCourse();
    fetchEnrolledCourses();
  }, []);

  const logToken=async ()=>{
   console.log( await getToken());
  }
  useEffect(()=>{
    if(user){
      logToken();
    }
  },[user]);

  const value = {
    currency,
    allCourses,
    courseRate,
    navigate,
    calculateChapterTime,
    calculateCourseTime,
    calculateNoOfLecture,
    fetchEnrolledCourses,
    enrolledCourses,
    isEducator
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
