import { useNavigate } from "react-router-dom";
import { createContext, useEffect, useState } from "react";
import humanizeDuration from "humanize-duration";
import { useAuth, useUser } from "@clerk/clerk-react";
import { toast } from "react-toastify";
import axios from "axios";
export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const navigate = useNavigate();
  const currency = import.meta.env.VITE_CURRENCY;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const { getToken } = useAuth();
  const { user } = useUser();

  const [allCourses, setAllCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [isEducator, setIsEducator] = useState(0);
  const [userData, setUserData] = useState(null);

  const fetchAllCourse = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/course/all`);

      if (data.success) {
        setAllCourses(data.courses);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

const fetchUserData = async () => {
  try {
    const token = await getToken();
    const { data } = await axios.get(`${backendUrl}/api/user/data`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("user",data)

    if (data.success) {
      setUserData(data.user);
      if (data.user.role === "educator") {
        setIsEducator(1);
      }
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error(error.message);
  }
};

useEffect(() => {
  const logToken = async () => {
    const token = await getToken();
    console.log(token);
  };

  logToken();
}, []);

  const courseRate = (course) => {
    if (course?.courseRatings?.length == 0) return 0;

    let rate = 0;
    course.courseRatings.forEach((rating) => {
      rate += rating.rating;
    });
    return Math.floor(rate / course.courseRatings.length);
  };

  const calculateChapterTime = (chapter) => {
    try {
      let time = 0;
      chapter.forEach((lecture) => {
        time += lecture?.lectureDuration;
      });
      return humanizeDuration(time * 60 * 1000, { units: ["h", "m"] });
    } catch (error) {
      console.log(error.message);
    }
  };

  const calculateCourseTime = (course) => {
    try {
      let time = 0;
      course?.courseContent?.forEach((chapter) =>
        chapter?.chapterContent?.forEach((lecture) => {
          time += lecture?.lectureDuration;
        })
      );
      return humanizeDuration(time * 60 * 1000, { units: ["h", "m"] });
    } catch (error) {
      console.log(error.message);
    }
  };

  const calculateNoOfLecture = (courseContent) => {
    try {
      let totalLecture = 0;

      courseContent?.forEach((chapter) => {
        if (Array.isArray(chapter?.chapterContent)) {
          totalLecture += chapter?.chapterContent?.length;
        }
      });

      return totalLecture;
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchEnrolledCourses = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get(
        `${backendUrl}/api/user/enrolled-courses`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (data.success) {
        setEnrolledCourses(data?.enrolledCourses?.reverse());
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    fetchAllCourse();
  }, []);

  useEffect(() => {
    if (user) {
      fetchUserData();
      fetchEnrolledCourses();
    }
  }, [user]);

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
    isEducator,
    backendUrl,
    userData,
    setUserData,
    getToken,
    fetchAllCourse,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
