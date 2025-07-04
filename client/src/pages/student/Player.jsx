import { assets } from "@/assets2/assets";
import Footer from "@/components/student/Footer";
import Loading from "@/components/student/Loading";
import Rating from "@/components/student/Rating";
import { AppContext } from "@/context/AppContext";
import humanizeDuration from "humanize-duration";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import YouTube from "react-youtube";

export default function Player() {
  const { enrolledCourses, calculateChapterTime } = useContext(AppContext);
  const { courseId } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [openSection, setOpenSection] = useState({});
  const [playerData,setPlayerData]=useState(null);

  const toggleSection = (index) => {
    setOpenSection((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const getCourseData = () => {
  const course = enrolledCourses.find(course => course._id === courseId);
  if (course) setCourseData(course);
};

  useEffect(() => {
    getCourseData();
  }, [enrolledCourses]);

if (!courseData) {
  return <Loading/>
}

  return (<>
    <div className="md:px-36 px-10 flex flex-col-reverse md:grid md:grid-cols-2 gap-10 ">
      {/* left */}
      <div className="md:pt-5">
        <div className="md:pt-8 text-gray-600">
          <h2 className="font-semibold text-md md:text-xl">Course Structure</h2>
          <div className="mt-6 max-w-xl cursor-pointer text-xs lg:text-sm">
            {courseData && courseData.courseContent.map((chapter, idx) => (
              <div
                key={idx}
                className="flexbg-white border border-gray-300 mb-2 select-none overflow-hidden"
              >
                <div
                  className="flex justify-between gap-2 px-2 lg:px-4 py-2 lg:py-3 border-b-1 border-gray-300 "
                  onClick={() => toggleSection(idx)}
                >
                  <div className="flex gap-x-2 ">
                    <img
                      src={assets.down_arrow_icon}
                      className={`transition-transform duration-500 ${
                        openSection[idx] ? "rotate-180" : ""
                      }`}
                    />
                    <p className="font-medium "> {chapter.chapterTitle}</p>
                  </div>
                  <p>
                    {chapter?.chapterContent?.length} lectures -{" "}
                    {calculateChapterTime(chapter.chapterContent)}
                  </p>
                </div>

                <div
                  className={` px-2 lg:px-4 transition-all duration-500 ease-in-out ${
                    openSection[idx] ? "  max-h-96 " : "max-h-0"
                  }`}
                >
                  <ul className="py-1 lg:py-2">
                    {chapter.chapterContent.map((lecture, i) => (
                      <li
                        key={i}
                        className="flex  gap-2 pl-2 lg:pl-4 py-1 cursor-pointer"
                      >
                        <img src={false ?assets.blue_tick_icon:assets.play_icon} />
                        <div className="flex justify-between w-full">
                          <p>{lecture.lectureTitle}</p>
                          <div className="flex gap-3">
                            {lecture.lectureUrl && (
                              <p
                                className="text-blue-500"
                                onClick={() =>
                                  setPlayerData({
                                   ...lecture,chapter:idx+1,lecture:i+1
                                  })
                                }
                              >
                                Watch
                              </p>
                            )}
                            <p>
                              {humanizeDuration(
                                lecture.lectureDuration * 60 * 1000,
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
            
          </div>
        </div>
      <div className="flex items-center mt-5 md:mt-10">
        <h1 className="text-sm md:text-xl font-semibold py-2 md:py-5 ">Rate this course : </h1>
        <Rating initialRating={0}/>
      </div>
      </div>

      {/* right */}
      <div className="md:mt-15 mt-10">
        {
          playerData?(<div ><YouTube  videoId={playerData.lectureUrl.split('/').pop()}
             
              iframeClassName="w-full aspect-video h-fit rounded-2xl shadow-2xl border-gray-200"
             />
             <div className="flex items-center justify-between mt-1 text-[10px] lg:text-base">
              <p>{playerData.chapter}.{playerData.lecture} {playerData.lectureTitle}</p>
              <button className="text-blue-600">{false?'Completed':'Mark complete'}</button>
             </div>
             
             </div>):<img className=" rounded-xl border-gray-200 shadow-2xl"src={courseData.courseThumbnail }/>

        }
      </div>
    </div>
      <Footer/>
      </>
  );
}
