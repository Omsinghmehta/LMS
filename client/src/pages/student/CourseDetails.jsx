import { assets } from "@/assets2/assets";
import Footer from "@/components/student/Footer";
import { AppContext } from "@/context/AppContext";
import humanizeDuration from "humanize-duration";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function CourseDetails() {
  const { id } = useParams();
  const {
    allCourses,
    courseRate,
    calculateCourseTime,
    calculateChapterTime,
    calculateNoOfLecture,
    currency,
  } = useContext(AppContext);
  const [courseData, setCourseData] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(0);
  const [openSection, setOpenSection] = useState({});

  const toggleSection = (index) => {
    setOpenSection((prev) => ({ ...prev, [index]: !prev[index] }));
  };
  const fetchData = () => {
    const details = allCourses.find((course) => course._id === id);
    setCourseData(details);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!courseData)
    return (
      <div className="text-center text-3xl font-bold md:mt-30 mt-10">
        Loading data...
      </div>
    );

  return (
    <div>
      <div className=" min-h-screen  grid md:grid-cols-2  grid-cols-1  gap-10  bg-gradient-to-b from-cyan-200/45 to-white ">
        <div className=" h-full w-full md:px-35 px-10 md:pt-20 pt-10">
          <h1 className="text-4xl font-semibold text-gray-800 ">
            {courseData.courseTitle}
          </h1>
          <p
            className="pt-2 md:pt-5 max-w-xl text-gray-600"
            dangerouslySetInnerHTML={{
              __html: courseData.courseDescription.slice(0, 200),
            }}
          ></p>

          <div className="flex items-center space-x-2 text-sm pt-3 pb-1">
            <p>{courseRate(courseData)}</p>
            <div className="flex ">
              {[...Array(5)].map((_, i) => (
                <img
                  key={i}
                  src={
                    i < Math.floor(courseRate(courseData))
                      ? assets.star
                      : assets.star_blank
                  }
                  className="w-3.5 h-3.5 "
                  alt="img"
                />
              ))}
            </div>
            <p className="text-blue-600">
              ({courseData.courseRatings.length}{" "}
              {courseData.courseRatings.length > 1 ? "ratings" : "rating"})
            </p>
            <p>
              {courseData.enrolledStudents.length}{" "}
              {courseData.enrolledStudents.length > 1 ? "students" : "student"}
            </p>
          </div>
          <p className="text-sm">
            Course by <span className="text-blue-600 underline">Learnify</span>
          </p>
          <div className="pt-8 text-gray-600">
            <h2 className="font-semibold text-xl">Course Structure</h2>
            <div className="mt-6 max-w-xl cursor-pointer">
              {courseData.courseContent.map((chapter, idx) => (
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
                      <p className="font-medium "> {chapter.chapterTitle}</p>
                    </div>
                    <p>
                      {chapter?.chapterContent?.length} lectures -{" "}
                      {calculateChapterTime(chapter.chapterContent)}
                    </p>
                  </div>

                  <div
                    className={` px-4 transition-all duration-500 ease-in-out ${
                      openSection[idx] ? "  max-h-96 " : "max-h-0"
                    }`}
                  >
                    <ul className="py-2">
                      {chapter.chapterContent.map((lecture, i) => (
                        <li
                          key={i}
                          className="flex  gap-2 pl-4 py-1 cursor-pointer"
                        >
                          <img src={assets.play_icon} />
                          <div className="flex justify-between w-full">
                            <p>{lecture.lectureTitle}</p>
                            <div className="flex gap-3">
                              {lecture.isPreviewFree && (
                                <p className="text-blue-500">Preview</p>
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
              <div className=" my-10 md:pb-20">
                <h1 className="text-xl font-bold ">Course Description</h1>
                <p
                  className="rich-text pt-3"
                  dangerouslySetInnerHTML={{
                    __html: courseData.courseDescription,
                  }}
                ></p>
              </div>
            </div>
          </div>
        </div>

        {/* right side */}
        <div className=" rounded md:px-45 px-10 md:pt-20 ">
          <img src={courseData.courseThumbnail} />
          <div className=" bg-white rounded-b shadow-md px-7 py-5">
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
                  courseData.coursePrice -
                  (courseData.discount * courseData.coursePrice) / 100
                ).toFixed(2)}
              </h1>
              <h1 className="font-medium line-through  text-xs md:text-base text-gray-600">
                {currency}
                {courseData.coursePrice}
              </h1>
              <h1 className="font-medium text-xs md:text-base  text-gray-600">
                {currency}
                {courseData.discount}% off
              </h1>
            </div>
            <div className="flex items-center ">
              <div className="flex gap-1 py-3 items-center">
                <img className="h-3 w-auto md:h-auto md:w-auto" src={assets.star} />
                <p className="text-xs md:text-base">{courseRate(courseData)}</p>
              </div>

              <div className="text-gray-500 px-3 md:px-5">|</div>

              <div className="flex gap-1 py-3 items-center">
                <img className="h-3 w-auto md:h-auto md:w-auto" src={assets.time_clock_icon} />
                <p className="text-xs md:text-base">{calculateCourseTime(courseData)}</p>
              </div>

              <div className="text-gray-500 px-3 md:px-5">|</div>

              <div className="flex gap-2 items-center  md:py-3">
                <img src={assets.lesson_icon} className="h-3 w-auto md:h-auto md:w-auto"/>
                <p className="text-xs md:text-base">{calculateNoOfLecture(courseData.courseContent)} lessons</p>
              </div>
            </div>

            <button className="text-white bg-blue-600 cursor-pointer hover:bg-blue-500 w-full py-2 md:py-3 mt-1 md:mt-2 ">
              {isEnrolled ? "Already Enrolled" : "Enroll Now"}
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
