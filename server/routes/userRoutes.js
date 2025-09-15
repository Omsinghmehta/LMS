import express from 'express';
import { addComment, addUserRating, aiSearch, getUserData, getUserProgressData, purchaseCourse, updateUserCourseProgress, userEnrolledCourses } from '../controllers/userController.js';

const userRouter=express.Router();

userRouter.get('/data',getUserData);
userRouter.get('/enrolled-courses',userEnrolledCourses);
userRouter.post('/purchase',purchaseCourse);
userRouter.post('/update-course-progress',updateUserCourseProgress);
userRouter.post('/get-course-progress',getUserProgressData);
userRouter.post('/add-rating',addUserRating);
userRouter.post('/add-comment',addComment);
userRouter.post('/aiSearch',aiSearch);


export default userRouter;

