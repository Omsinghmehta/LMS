import React from "react";
import { Route, Routes, useMatch } from "react-router-dom";
import Home from "./pages/student/Home";
import CoursesList from "./pages/student/CoursesList.jsx";
import CourseDetails from "./pages/student/CourseDetails";
import MyEnrollments from "./pages/student/MyEnrollments";
import Player from "./pages/student/Player";
import Loading from "./components/student/Loading";
import Educator from "./pages/educator/Educator";
import DashBoard from "./pages/educator/DashBoard";
import AddCourse from "./pages/educator/AddCourse";
import MyCourses from "./pages/educator/MyCourses";
import StudentEnrolled from "./pages/educator/StudentsEntrolled";
import Navbar from "./components/student/Navbar";
import "quill/dist/quill.snow.css";

export default function App() {
  const isEducatorRoute = useMatch("/educator/*");

  return (
    <div className="w-[100vw] p-0 m-0'">
      {!isEducatorRoute && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses-list"  element={<CoursesList />} />
        <Route path="/course/:id" element={<CourseDetails />} />
        <Route path="/course-list/:input" element={<CoursesList />} />
        <Route path="/my-enrollments" element={<MyEnrollments />} />
        <Route path="/player/:courseId" element={<Player />} />
        <Route path="/loading/:path" element={<Loading />} />

        {/* educator */}
        <Route path="/educator" element={<Educator />}>
          <Route path="/educator" element={<DashBoard />}></Route>
          <Route path="add-course" element={<AddCourse />}></Route>
          <Route path="my-courses" element={<MyCourses />}></Route>
          <Route path="student-enrolled" element={<StudentEnrolled />}></Route>
        </Route>
      </Routes>
    </div>
  );
}
