import Course from "../models/Course.js";
import Feedback from "../models/Feedback.js";

export const getAllCourse = async (req, res) => {
    try {
        const courses = await Course.find({ isPublished: true }).select(['-courseContent', '-enrolledStudents']).
            populate({ path: 'educator' });

        res.json({ success: true, courses })

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

export const getCourseId = async (req, res) => {
    const { id } = req.params;
    try {
            
        const courseData=await Course.findById(id).populate({path:'educator'})
        courseData.courseContent.forEach((chapter)=>{
            chapter.chapterContent.forEach((lecture)=>{
                if(!lecture.isPreviewFree)
                {
                    lecture.lectureUrl="";
                }
            })
        })
        res.json({ success: true, courseData });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

export const getAllComments=async(req,res)=>{
    try {
        const {courseId}=req.params;
        const comments=await Feedback.find({courseId:courseId}).sort({createdAt:-1}).select("userName comment createdAt");
        res.json({success: true,comments});
    } catch (error) {
        res.json({success: false,message:error.message})
    }
}

export const isCompleted=async(req,res)=>{
    try {
        const {userId,courseId}=req.body;
        const res=await CourseProgress.find({userId,courseId});
        res.json({success:true,isCompleted:res.completed})
    } catch (error) {
        res.json({success: false,message:error.message})
        
    }
}