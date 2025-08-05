import express from 'express';
import { getAllComments, getAllCourse, getCourseId } from '../controllers/courseController.js';

const courseRouter=express.Router();

courseRouter.get('/all',getAllCourse);
courseRouter.get('/:id',getCourseId);
courseRouter.get('/comment/:courseId',getAllComments);

export default courseRouter;

