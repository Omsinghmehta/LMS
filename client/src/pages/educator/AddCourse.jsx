import React, {  useContext, useEffect, useRef, useState } from "react";
import Quill from "quill";
import {nanoid} from "nanoid";
import { assets } from "@/assets2/assets";
import { AppContext } from "@/context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

export default function AddCourse() {
  const quillRef = useRef(null);
  const editorRef = useRef(null);

  const [courseTitle, setCourseTitle] = useState("");
  const [coursePrice, setCoursePrice] = useState(null);
  const [discount, setDiscount] = useState(0);
  const [image, setImage] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [showPopUps, setShowPopUps] = useState(false);
  const [currentChapterId, setCurrentChapterId] = useState(null);

  const [lectureDetails, setLectureDetails] = useState({
    lectureUrl: "",
    lectureTitle: "",
    lectureDuration: "",
    isPreviewFree: false,
  });
  const {backendUrl,getToken}=useContext(AppContext);

  const handleChapter=(action,chapterId)=>{
    if(action==='add')
    {
      const title=prompt('Enter Chapter Name:');
      if(title)
      {
        const newChapter={
          chapterId:nanoid(),
          chapterTitle:title,
          chapterContent:[],
          collapsed:false,
          chapterOrder:chapters.length>0 ?chapters.slice(-1)[0].chapterOrder+1:1,};
          setChapters([...chapters,newChapter]);
        }
      }
      else if(action==='remove')
      {
            setChapters(chapters.filter((chapter)=>chapter.chapterId!==chapterId));
      }

      else if(action==='toggle')
      {
        setChapters(chapters.map((chapter)=>chapter.chapterId==chapterId?{...chapter,collapsed:!chapter.collapsed}:chapter)) 
      }
    };

    const handlelecture=(action,chapterId,lectureIdx)=>{
      if(action==='add')
      {
        setCurrentChapterId(chapterId);
        setShowPopUps(true);
      }
      else if(action==='remove')
      {
        setChapters(chapters.map((chapter)=>{
          if(chapter.chapterId===chapterId){
            chapter.chapterContent.splice(lectureIdx,1);
          }
          return chapter;
        })
      )
    }};
  
    const addLecture=()=>{
      setChapters(
        chapters.map((chapter)=>{
          if(chapter.chapterId===currentChapterId){
            const newLecture={
              ...lectureDetails,
              lectureOrder:chapter.chapterContent.length>0 ?chapter.chapterContent.slice(-1)[0].lectureOrder+1:1,
              lectureId:nanoid()
            };
            chapter.chapterContent.push(newLecture);
          }
          return chapter
        })
      )
      setShowPopUps(false);
      setLectureDetails({
        lectureTitle:'',
        lectureDuration:'',
        lectureUrl:'',
        isPreviewFree:false,
      })
    }

    const handleSubmit=async (e)=>{
      try {
        e.preventDefault();
        if(!image)
          toast.error('Thumbnail Not Selected');

        const courseData={
          coursePrice:Number(coursePrice),
          courseTitle,
          discount:Number(discount),
          courseContent:chapters,
          courseDescription:quillRef.current.root.innerHTML
        }

        const formData=new FormData();
         formData.append('courseData', JSON.stringify(courseData)); 
         formData.append('image', image);

        const token=await getToken();
        const {data}=await axios.post(`${backendUrl}/api/educator/add-course`,formData,{headers:{Authorization:`Bearer ${token}`}})
        if(data.success){
          toast.success(data.message)
          setCourseTitle('');
          setCoursePrice(0);
          setDiscount(0);
          setImage(null);
          setChapters([]);
          quillRef.current.root.innerHTML=""
        }
        else{
          toast.error(data.message)
        }
      } catch (error) {
          toast.error(error.message)
      }
    }
  useEffect(() => {
    if (!quillRef.current && editorRef.current)
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
      });
  }, []);

  return (
    <div className="md:p-8  pt-8 pb-0 p-4 h-screen flex flex-col overflow-scroll justify-between items-start   ">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md  w-full text-gray-500 ">
        <div className="flex flex-col gap-1 ">
          <p>Course Title</p>
          <input
            type="text"
            placeholder="Type here"
            value={courseTitle}
            onChange={(e) => setCourseTitle(e.target.value)}
            required
            className="md:py-2.5 py-2 px-3 outline-none border  rounded border-gray-500"
          />
        </div>

        <div className="flex flex-col gap-1">
          <p>Course Description</p>
          <div ref={editorRef}></div>
        </div>

        <div className="flex justify-between flex-wrap ">
          <div className="flex flex-col gap-1">
            <p>Course Price</p>
            <input
              type="number"
              placeholder="0"
              value={coursePrice}
              onChange={(e) => setCoursePrice(e.target.value)}
              className="required border border-gray-500 px-3 md:py-2.5 outline-none py-2 w-28 rounded"
            />
          </div>
          <div className="flex md:flex-row flex-col gap-3 items-center">
            <p>Course Thumbnail</p>
            <label htmlFor="thumbnailImage" className="flex items-center gap-3">
              <img
                src={assets.file_upload_icon}
                alt=""
                className="rounded p-3 bg-blue-500"
              />
              <input
                type="file"
                accept="image/* "
                hidden
                id="thumbnailImage"
                onChange={(e) => setImage(e.target.files[0])}
              />
              <img
                className="max-h-10"
                src={image ? URL.createObjectURL(image) : ""}
                alt=""
              />
            </label>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <p>Discount %</p>
          <input
            type="number"
            placeholder="0"
            value={discount}
            min={0}
            max={100}
            onChange={(e) => setDiscount(e.target.value)}
            className="required border border-gray-500 px-3 md:py-2.5 outline-none py-2 w-28 rounded"
          />
        </div>

        <div>
          {chapters.map((chapter, chapterIdx) => (
            <div key={chapterIdx} className="border bg-white rounded-lg mb-4">
              <div className="flex justify-between items-center border-b p-4">
                <div className="flex items-center">
                  <img
                    onClick={()=>handleChapter('toggle',chapter.chapterId)}
                    src={assets.dropdown_icon}
                    alt=""
                    width={14}
                    className={`mr-2 cursor-pointer transition-all ${
                      chapter.collapsed && "-rotate-90"
                    }`}
                  />
                  <span className="font-semibold">
                    {chapterIdx + 1} {chapter.chapterTitle}
                  </span>
                </div>
                <span className="text-gray-500">{chapter.chapterContent.length} Lectures</span>
                <img
                  onClick={()=>handleChapter('remove',chapter.chapterId)}
                  src={assets.cross_icon}
                  alt=""
                  className="cursor-pointer"
                />
              </div>
              {!chapter.collapsed && (
                <div className="p-4">
                  {chapter.chapterContent.map((lecture, lectureidx) => (
                    <div
                      key={lectureidx}
                      className="flex justify-between items-center mb-2"
                    >
                      <span>
                        {lectureidx + 1}
                        {lecture.lectureTitle} -{lecture.lectureDuration} mins -
                        <a
                          href={lecture.lectureUrl}
                          target="_blank"
                          className="text-blue-500"
                        >
                          Link
                        </a>{" "}
                        - {lecture.isPreviewFree ? "Free Preview" : "Paid"}
                      </span>
                      <img
                        src={assets.cross_icon} onClick={()=>handlelecture('remove',chapter.chapterId,lectureidx)}
                        className="cursor-pointer"
                        alt=""
                      />
                    </div>
                  ))}
                  <div className="inline-flex bg-gray-100 p-2 rounded cursor-pointer mt-2" onClick={()=>handlelecture('add',
                    chapter.chapterId )}>
                    + Add Lecture
                  </div>
                </div>
              )}
            </div>
          ))}
          <div className="flex items-center justify-center rounded-lg bg-blue-100  p-2 cursor-pointer" onClick={()=>handleChapter('add')}>
            + Add chapter
          </div>
          {
            showPopUps && (
              <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                <div className="rounded p-4 bg-white text-gray-700 relative w-full max-w-80">
                  <h2 className="font-semibold text-lg mb-4">Add Lecture</h2>

                  <div className="mb-2">
                    <p>Lecture Title</p>
                    <input type="text" className="mt-1 block w-full border py-1 px-2" 
                    value={lectureDetails.lectureTitle}
                    onChange={e=>setLectureDetails({...lectureDetails,lectureTitle: e.target.value})}/>
                  </div>

                   <div className="mb-2">
                    <p>Duration (minutes)</p>
                    <input type="number" className="mt-1 block w-full border py-1 px-2" 
                    value={lectureDetails.lectureDuration}
                    onChange={e=>setLectureDetails({...lectureDetails,lectureDuration: e.target.value})}/>
                  </div>

                   <div className="mb-2">
                    <p>Lecture URL</p>
                    <input type="text" className="mt-1 block w-full border py-1 px-2" 
                    value={lectureDetails.lectureUrl}
                    onChange={e=>setLectureDetails({...lectureDetails,lectureUrl: e.target.value})}/>
                  </div>

                   <div className="flex gap-4 my-4">
                    <p>Is Preview Free?</p>
                    <input type="checkbox" className="mt-1 scale-125" 
                    value={lectureDetails.isPreviewFree}
                    onChange={e=>setLectureDetails({...lectureDetails,isPreviewFree: e.target.checked})}/>
                  </div>

                  <button onClick={addLecture} className="w-full  bg-blue-400 py-2 px-4 text-white">Add</button>
                  <img src={assets.cross_icon} onClick={()=>setShowPopUps(false)} className="absolute w-4 top-4 right-4 cursor-pointer" alt="" />
                </div>
              </div>
            )
          }
        </div>
        <button type="submit" className="text-white bg-black w-max rounded py-2.5 px-8 my-4">ADD</button>
      </form>
    </div>
  );
}
