import mongoose  from "mongoose";

const lectureSchema=new mongoose.Schema({
    lectureTitle:{type:String,required:true},
    lectureId:{type:String,required:true},
    lectureDuration:{type:Number,required:true},
    lectureUrl:{type:String,required:true},
    isPreviewFree:{type:Boolean,required:true},
    lectureOrder:{type:Number,required:true},
},{_id:false});

const chapterSchema=new mongoose.Schema({
    chapterTitle:{type:String,required:true},
    chapterId:{type:String,required:true},
    chapterContent:[lectureSchema],
    chapterOrder:{type:Number,required:true},
},{_id:false});

const courseSchema=new mongoose.Schema({
    courseTitle:{type:String,required:true},
    courseDescription:{type:String,required:true},
    courseThumbnail:{type:String},
    isPublished:{type:Boolean,default:true},
    courseContent:[chapterSchema],
    coursePrice:{type:Number,required:true},
    discount:{type:Number,required:true,min:0,max:100},
    courseRatings:[
        {
            userId:{type:String},ratings:{type:Number,min:1,max:5}
        }
    ],
    educator:{type:String,required:true,ref:'User'},
    enrolledStudents:[
        {type:String,ref:'User'}
    ]

},{timestamps:true,minimize:false});

const Course=mongoose.model('Course',courseSchema);
export default Course