import mongoose from "mongoose";

const feedbackSchema=mongoose.Schema({
    courseId:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    },
    userName:{
        type:String,
        required:true
    },
    comment:{
        type:String,
        required:true,
        trim: true
    }
},{timestamps:true});

const Feedback=mongoose.model('Feedback',feedbackSchema);
export default Feedback;