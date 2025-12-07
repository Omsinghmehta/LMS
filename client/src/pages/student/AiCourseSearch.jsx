import React, { useContext, useState } from "react";
import axios from "axios";
import CourseCard from "@/components/student/CourseCard.jsx";
import { AppContext } from "@/context/AppContext";

const AiCourseSearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { backendUrl } = useContext(AppContext);

  const handleSearch = async () => {
    if (!query.trim()) return;
    
    setLoading(true);
    setError("");
    
    try {
      // console.log(query);
      const res = await axios.post(`${backendUrl}/api/user/aiSearch`, { query });
      // console.log(res.data);

      let myarr = [];

      if (Array.isArray(res.data.courses)) {
        myarr = res.data.courses;
      } else if (res.data.courses) {
        myarr = [res.data.courses];
      }

      setResults(myarr);
      
      if (myarr.length === 0) {
        setError("No courses found. Try a different search!");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to get AI recommendations. Please try again.");
      setResults([]);
    }
    
    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="p-6 max-w-full mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-indigo-600 px-32">
        AI Course Search
      </h2>

      <div className="flex gap-2 max-w-2xl px-32">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Search for courses (e.g. backend, DSA, AI)..."
          className="flex-1 px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500"
          disabled={loading}
        />
        <button
          onClick={handleSearch}
          disabled={loading || !query.trim()}
          className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:scale-105 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {error && (
        <div className="mt-4 px-32">
          <p className="text-red-500 text-center">{error}</p>
        </div>
      )}

      {loading && (
        <div className="mt-8 text-center">
          <p className="text-gray-600">Getting AI recommendations...</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 px-10 md:px-30 mt-16">
        {console.log("result", results)}

        {!loading && results.length === 0 && query && !error && (
          <p className="col-span-full text-center text-gray-500">
            No results yet. Try searching for something!
          </p>
        )}

        {results?.map((course, idx) => (
          <CourseCard course={course} key={idx} />
        ))}
      </div>
    </div>
  );
};

export default AiCourseSearch;