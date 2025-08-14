import { clerkClient } from '@clerk/express';
import { v2 as cloudinary } from 'cloudinary';
import Course from '../models/Course.js';
import  {Purchase}  from '../models/Purchase.js';
import User from '../models/User.js';

export const updateRoleToEducator = async (req, res) => {
    try {
         const {userId} =await req.auth();
        await clerkClient.users.updateUserMetadata(userId, {
            publicMetadata: {
                role: 'educator',
            },
        });

        res.status(200).json({ success: true, message: 'You can publish a course now' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const addCourse = async (req, res) => {
    try {
        const { courseData } = req.body;
        const imageFile = req.file;
        const {userId} =await req.auth();
        const educatorId =userId 
        if (!courseData || !imageFile) {
            return res.status(400).json({ success: false, message: 'Course data or image file missing' });
        }
        const parsedCourseData = await JSON.parse(courseData);
        parsedCourseData.educator = educatorId;
        const newCourse = await Course.create(parsedCourseData);
        const imageUpload = await cloudinary.uploader.upload(imageFile.path);
        newCourse.courseThumbnail = imageUpload.secure_url;
        await newCourse.save();

        res.status(201).json({
            success: true,
            message: 'Course added successfully',
        });
    } catch (error) {
        console.error('Error adding course:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getEducatorCourses = async (req, res) => {
    try {
        const {userId} =await req.auth();
        const educator=userId;
        const courses = await Course.find({ educator });
        res.json({ success: true, courses });
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

export const educatorDashboardData = async (req, res) => {
    try {
         const {userId} =await req.auth();
        const educator = userId;
        const courses = await Course.find({ educator });

        const totalCourses = courses.length;

        const courseIds = courses.map((course) => course._id);
        const purchases = await Purchase.find({
            courseId: { $in: courseIds },
            status: 'completed'
        });
// console.log(purchases)
        const totalEarnings = purchases.reduce((sum, purchase) => sum + purchase.amount, 0);
        const enrolledStudentData = [];

        for (const course of courses) {
            const students = await User.find({
                _id: { $in: course.enrolledStudents }
            }, 'name imageUrl')

            students.forEach(student => {
                enrolledStudentData.push({
                    courseTitle: course.courseTitle,
                    student,
                    id:course._id,
                    instructor:course.educator
                });
            });
        }

        res.json({
            success: true, dashboardData: {
                totalEarnings, enrolledStudentData, totalCourses
            }
        })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

export const getEnrolledStudentsData = async (req, res) => {
    try {
         const {userId} = await req.auth();
        const educator=userId;
        const courses = await Course.find({ educator });

        const courseIds = courses.map((course) => course._id);
        const purchases = await Purchase.find({
            courseId: { $in: courseIds },
            status: 'completed'
        }).populate('userId', 'name imageUrl').populate('courseId', 'courseTitle');

        const enrolledStudents = purchases.map((purchase) => ({
            student: purchase.userId,
            courseTitle: purchase.courseId.courseTitle,
            purchaseDate: purchase.createdAt
        }))

         res.json({
            success: true, enrolledStudents })

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}
