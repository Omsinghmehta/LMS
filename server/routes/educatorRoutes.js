import express from 'express';
import { addCourse, updateRoleToEducator } from '../controllers/educatorController.js';
import upload from '../configs/multer.js';
import { requireAuth } from '@clerk/express';

import { protectEducator } from '../middlewares/authMiddleware.js';

const educatorRouter=express.Router();

educatorRouter.get('/update-role',updateRoleToEducator);
educatorRouter.post(
  '/add-course',
  requireAuth(), // ✅ Run this first to ensure Clerk user is verified
  upload.single('image'), // ✅ Handles multipart/form-data
  (req, res, next) => {
    console.log('🧩 Multer ran, req.file:', req.file?.originalname);
    next();
  },
  protectEducator, // ✅ Confirms role
  (req, res, next) => {
    console.log('✅ addCourse should run next');
    next();
  },
  addCourse // ✅ Main controller
);


export default educatorRouter;