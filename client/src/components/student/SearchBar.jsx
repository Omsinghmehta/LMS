import { SearchCodeIcon, SearchIcon } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBar({ data }) {
  const navigate = useNavigate();
  const [input, setInput] = useState(data ? data : "");
  const submitHandler = (e) => {
    e.preventDefault();
    navigate('/course-list/'+input);
  };
  return (
    <div>
      <form onSubmit={submitHandler}>
        <div className="flex border w-md rounded px-2 py-1 ml-10 items-center border-gray-400 h-13 mt-10 hover:outline-1">
          <SearchIcon />
          <input
            type="text"
            placeholder="Search For Courses"
            class="border-0 focus:outline-none text-xl ml-2 "
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            className="bg-blue-600 text-white p-2 w-20 h-10
            items-center content-center flex rounded ml-13 text-[20px]"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
}
