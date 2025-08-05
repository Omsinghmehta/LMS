import { assets } from "@/assets2/assets";
import CommentForm from "@/components/student/CommentForm";
import CommentList from "@/components/student/CommentList";
import Footer from "@/components/student/Footer";
import Loading from "@/components/student/Loading";
import { AppContext } from "@/context/AppContext";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import humanizeDuration from "humanize-duration";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import YouTube from "react-youtube";

export default function CourseDetails() {
  const { id } = useParams();
  const {
    courseRate,
    calculateCourseTime,
    calculateChapterTime,
    calculateNoOfLecture,
    currency,
    backendUrl,
    userData,
    getToken
  } = useContext(AppContext);
  const [courseData, setCourseData] = useState(null);
  const [openSection, setOpenSection] = useState({});
  const [playedData, setPlayerData] = useState(null);
  const [isAlreaduEnrolled,setIsAlreaduEnrolled]=useState(0);
  const [isEnrolled, setIsEnrolled] = useState(null);
 
  const toggleSection = (index) => {
    setOpenSection((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const myfun= (id)=>{
    const res = userData.enrolledCourses.includes(id);
  setIsEnrolled(res);
  console.log(res);
  }
  
  useEffect(()=>{
    myfun(id);
  },[userData])

  const fetchData = async() => {
    try {
      const {data}=await axios.get(`${backendUrl}/api/course/${id}`);
      
      if(data.success){
        setCourseData(data.courseData);
      }else{
        toast.error(data.message);
      }
    } catch (error) {
        toast.error(error.message);
    }
  };
const enrollCourse=async (req,res)=>{
  try {
    if(!userData)
    {
      return toast.warn('Login To Enroll')
    }
    else if(isAlreaduEnrolled)
    {
      return toast.warn('Already Enrolled');
    }
    const token=await getToken();
    const {data}=await axios.post(`${backendUrl}/api/user/purchase`,{courseId:courseData?._id},{headers:{Authorization:`Bearer ${token}`}})
    if(data.success){
      const {session_url}=data;
      window.location.replace(session_url);

    }else{
      return toast.error(data.message);

    }
  } catch (error) {
      return toast.error(error.message);
    
  }
}
  useEffect(() => {
    fetchData();
  }, []);

   useEffect(() => {
    if(userData && courseData)
    setIsAlreaduEnrolled(userData.enrolledCourses.includes(courseData?._id));
  }, [userData,courseData]);

  if (!courseData)
    return (
      <div className="text-center text-3xl font-bold md:mt-30 mt-10">
        <Loading />
      </div>
    );

  return  (
    <div>
      <div className=" min-h-screen  grid lg:grid-cols-2  grid-cols-1  lg:gap-10  bg-gradient-to-b from-cyan-200/45 to-white ">
        <div className=" h-full w-full md:px-35 px-10 md:pt-20 pt-10 order-2 md:order-1">
          <h1 className="text-4xl font-semibold text-gray-800 ">
            {courseData?.courseTitle || "xyz"}
          </h1>
          <p
            className="pt-2 md:pt-5 max-w-xl text-gray-600"
            dangerouslySetInnerHTML={{
              __html: courseData.courseDescription.slice(0, 200),
            }}
          ></p>

          <div className="flex items-center space-x-2 text-sm pt-3 pb-1">
            <p>{courseRate?.(courseData) || '0'}</p>
            <div className="flex ">
              {[...Array(5)].map((_, i) => (
                <img
                  key={i}
                  src={
                    i < Math.floor(courseRate?.(courseData) || '0')
                      ? assets.star
                      : assets.star_blank
                  }
                  className="w-3.5 h-3.5 "
                  alt="img"
                />
              ))}
            </div>
            <p className="text-blue-600">
              ({courseData?.courseRatings?.length || 0}
              {courseData?.courseRatings?.length > 1 ? "ratings" : "rating"})
            </p>
            <p>
              {courseData?.enrolledStudents?.length || 0}
              {courseData?.enrolledStudents?.length > 1 ? "students" : "student"}
            </p>
          </div>
          <p className="text-sm">
            Course by <span className="text-blue-600 underline">{courseData?.educator?.name || "xyz"}</span>
          </p>
          <div className="pt-8 text-gray-600">
            <h2 className="font-semibold text-xl">Course Structure</h2>
            <div className="mt-6 max-w-xl cursor-pointer text-xs lg:text-sm">
              {courseData?.courseContent?.map((chapter, idx) => (
                <div
                  key={idx}
                  className="flexbg-white border border-gray-300 mb-2 select-none overflow-hidden"
                >
                  <div
                    className="flex justify-between gap-2 px-4 py-3 border-b-1 border-gray-300 "
                    onClick={() => toggleSection(idx)}
                  >
                    <div className="flex gap-x-2 ">
                      <img
                        src={assets.down_arrow_icon}
                        className={`transition-transform duration-500 ${
                          openSection[idx] ? "rotate-180" : ""
                        }`}
                      />
                      <p className="font-medium "> {chapter?.chapterTitle || "xyz"}</p>
                    </div>
                    <p>
                      {chapter?.chapterContent?.length || 0} lectures -{" "}
                      {calculateChapterTime?.(chapter?.chapterContent) || "0"}
                    </p>
                  </div>

                  <div
                    className={` px-2 lg:px-4 transition-all duration-500 ease-in-out ${
                      openSection[idx] ? "  max-h-96 " : "max-h-0"
                    }`}
                  >
                    <ul className="py-2">
                      {chapter?.chapterContent?.map((lecture, i) => (
                        <li
                          key={i}
                          className="flex  gap-2 pl-2 lg:pl-4 py-1 cursor-pointer"
                        >
                          <img src={assets.play_icon} />
                          <div className="flex justify-between w-full">
                            <p>{lecture?.lectureTitle || "xyz"}</p>
                            <div className="flex gap-3">
                              {lecture?.isPreviewFree && (
                                <p
                                  className="text-blue-500"
                                  onClick={() =>
                                    setPlayerData({
                                      videoId: lecture?.lectureUrl
                                        .split("/")
                                        .pop(),
                                    })
                                  }
                                >
                                  Preview
                                </p>
                              )}
                              <p>
                                {humanizeDuration(
                                  lecture?.lectureDuration * 60 * 1000,
                                  { units: ["h", "m"] }
                                )}
                              </p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
              <div className=" my-10 md:pb-20">
                <h1 className="text-xl font-bold ">Course Description</h1>
                <p
                  className="rich-text pt-3"
                  dangerouslySetInnerHTML={{
                    __html: courseData?.courseDescription || "xyz",
                  }}
                ></p>
              </div>
            {console.log(isEnrolled)}
              <CommentForm courseId={id} isEnrolled={isEnrolled}/>
              <CommentList courseId={id}/>
            </div>
          </div>
        </div>

        {/* right side */}
        <div className=" rounded xl:px-45 sm:px-18 px-10 md:pt-20 order-1 mt-10 md:mt-0 md:order-2 w-fit ">
          {playedData ? (
            <YouTube
              videoId={playedData?.videoId}
              opts={{ playerVars: { autoplay: 1 } }}
              iframeClassName="w-full aspect-video h-fit "
            />
          ) : (
            <img src={courseData?.courseThumbnail || assets.course_1_thumbnail} />
          )}
          <div className=" bg-gray-50 rounded-b shadow-xl px-7 py-5">
            <div className="flex gap-2">
              <img src={assets.time_left_clock_icon} />
              <p className="text-sm md:text-base">
                <span className="text-red-500">5 days</span> left at this price
              </p>
            </div>
            <div className="flex gap-3 pt-3 items-center">
              <h1 className="font-semibold text-xl md:text-3xl text-gray-800">
                {currency}
                {(
                  (courseData?.coursePrice || 0) -
                  (((courseData?.discount || 0) * (courseData?.coursePrice || 0)) / 100)
                ).toFixed(2)}
              </h1>
              <h1 className="font-medium line-through  text-xs md:text-base text-gray-600">
                {currency}
                {courseData?.coursePrice || 0}
              </h1>
              <h1 className="font-medium text-xs md:text-base  text-gray-600">
                {currency}
                {courseData?.discount || 0}% off
              </h1>
            </div>
            <div className="flex items-center ">
              <div className="flex gap-1 py-3 items-center">
                <img
                  className="h-3 w-auto md:h-auto md:w-auto"
                  src={assets.star}
                />
                <p className="text-xs md:text-base">{courseRate?.(courseData) || "0"}</p>
              </div>

              <div className="text-gray-500 px-1 md:px-2">|</div>

              <div className="flex gap-1 py-3 items-center">
                <img
                  className="h-3 w-auto md:h-auto md:w-auto"
                  src={assets.time_clock_icon}
                />
                <p className="text-xs md:text-base">
                  {calculateCourseTime?.(courseData) || "0"}
                </p>
              </div>

              <div className="text-gray-500 px-1 md:px-2">|</div>

              <div className="flex gap-2 items-center  md:py-3">
                <img
                  src={assets.lesson_icon}
                  className="h-3 w-auto md:h-auto md:w-auto"
                />
                <p className="text-xs md:text-base">
                  {calculateNoOfLecture(courseData?.courseContent || "xyz")} lessons
                </p>
              </div>
            </div>

            <button onClick={enrollCourse} className="text-white bg-blue-600 cursor-pointer hover:bg-blue-500 w-full py-2 md:py-3 mt-1 md:mt-2 ">
              {isAlreaduEnrolled ? "Already Enrolled" : "Enroll Now"}
            </button>

            <div className="pt-6">
              <p className="text-lg md:text-xl font-medium text-gray-800">
                What's in the course?
              </p>
              <ul className="list-disc text-gray-500 text-sm md:text-base ml-4 pt-2">
                <li>Lifetime access with free updates.</li>
                <li> Step-by-Step, hand-on project guidance.</li>
                <li>Downloadable resource and source code.</li>
                <li>Quizzes to test your knowledge.</li>
                <li>Certificate of completion.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer className="w-full" />
    </div>
  );
}
