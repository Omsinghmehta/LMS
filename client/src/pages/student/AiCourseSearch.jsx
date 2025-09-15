import React, { useContext, useState } from "react";
import axios from "axios";
import CourseCard from "@/components/student/CourseCard.jsx";
import { AppContext } from "@/context/AppContext";

const AiCourseSearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const {backendUrl}=useContext(AppContext)

const handleSearch = async () => {
  if (!query) return;
  setLoading(true);
  try {
    console.log(query);
    const res = await axios.post(`${backendUrl}/api/user/aiSearch`, { query });
    console.log(res.data);

    let myarr = [];

    if (Array.isArray(res.data.courses)) {
      myarr = res.data.courses; // already an array
    } else if (res.data.courses) {
      myarr = [res.data.courses]; // wrap single object in array
    }

    setResults(myarr);
  } catch (err) {
    console.error(err);
  }
  setLoading(false);
};

  
  return  (
    <div className="p-6 max-w-full mx-auto">


      <h2 className="text-2xl font-bold mb-4 text-indigo-600 px-32">AI Course Search</h2>

      <div className="flex gap-2 max-w-2xl px-32">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for courses (e.g. backend, DSA, AI)..."
          className="flex-1 px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500"
        />
        <button
          onClick={handleSearch}
          className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:scale-105 transition"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>
      

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3  px-10 md:px-30  mt-16">
              {console.log("result",results)}

        {
               results?.map((course, idx) => (
                  <CourseCard course={course} key={idx} />
                ))}
      </div>
    </div>
  );
};

export default AiCourseSearch;
