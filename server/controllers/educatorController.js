import { clerkClient } from '@clerk/express';
import { v2 as cloudinary } from 'cloudinary';
import Course from '../models/Course.js';

export const updateRoleToEducator = async (req, res) => {
    try {
        const { userId } = await req.auth(); 
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
        console.log('✅ addCourse endpoint hit'); // <-- add this
        const { userId } = await req.auth();
        const { courseData } = req.body;
        const imageFile = req.file;

        if (!courseData || !imageFile) {
            return res.status(400).json({ success: false, message: 'Course data or image file missing' });
        }

        const parsedCourseData = JSON.parse(courseData);
        parsedCourseData.educator = userId;

        const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
            folder: 'course_thumbnails',
        });

        parsedCourseData.courseThumbnail = imageUpload.secure_url;

        const newCourse = await Course.create(parsedCourseData);

        res.status(201).json({
            success: true,
            message: 'Course added successfully',
        });
    } catch (error) {
        console.error('Error adding course:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};
