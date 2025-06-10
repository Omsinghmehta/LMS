import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search as SearchIcon } from "lucide-react"; // or your SearchIcon source

export default function SearchBar({ data }) {
  const navigate = useNavigate();
  const [input, setInput] = useState(data || "");

  const submitHandler = (e) => {
    e.preventDefault();
    if (input.trim()) {
      navigate("/course-list/" + input);
    }
  };

  return (
    <div className=" mx-auto px-8 max-w-[500px] mt-10 ">
      <form onSubmit={submitHandler}>
        <div className="flex items-center border border-gray-400 rounded h-10 md:h-14 px-4 relative md:right-5">
          <SearchIcon className="w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search For Courses"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="  ml-2 text-sm md:text-base focus:outline-none"
          />
          <button
            type="submit"
            className="absolute right-2 bg-blue-600 text-white text-xs md:text-sm px-2 md:px-4 py-1 md:py-2 rounded"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
}
