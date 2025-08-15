# 📖 About the Project

Learnify LMS is a modern web application where:


1. Instructors create, update, and manage their own courses.

2. Students browse, preview, enroll, and learn from interactive lessons.

It supports videos, comments, and certificates — everything needed for online learning.


# 📌 Key Features – Learnify LMS

* User Authentication with clekr and role-based access (Instructor / Student)

* Course Management: Add course , stripe payment integration and  course rating

* Video Lectures: Upload or embed YouTube links, with free preview option

* Rich Text Editor for course content using Quill

* Progress Tracking for enrolled students

* Comment System: Students can give one feedback.

* Mini Chat Room : Students can ask questions.

* Certificate Generator with  signatures, logos, borders, and seals

* Media Storage via Cloudinary for videos, images, and documents

* Instructor Dashboard to view enrolled students, connect and manage content.

* Responsive Design for desktop, tablet, and mobile


# 🛠 Tech Stack

**Frontend:** React, Redux, Clerk, Context Api  
**Backend:** Node.js, Express.js  
**Database:** MongoDB, Mongoose  
**Others:** Cloudinary, Multer

![MERN](https://img.shields.io/badge/Stack-MERN-green) ![React](https://img.shields.io/badge/Frontend-React-blue) ![Node](https://img.shields.io/badge/Backend-Node.js-yellowgreen) ![MongoDB](https://img.shields.io/badge/Database-MongoDB-brightgreen)



# 📂 Folder Structure

<img width="257" height="506" alt="image" src="https://github.com/user-attachments/assets/0987edee-2745-4917-9328-896e5a28931c" />

#⚡Installation & Setup

1️. Clone Repository
  * git clone https://github.com/your-username/learnify-lms.git
  * cd learnify-lms

2️. Backend Setup
  * cd server
  * npm install

3. Create a .env file
  * MONGODB_URI=<your_mongodb_connection_string>
  * CLERK_WEBHOOK_SECRET=<your_clerk_webhook_secret>
  * CLERK_PUBLISHABLE_KEY=<your_clerk_publishable_key>
  * CLERK_SECRET_KEY=<your_clerk_secret_key>
  * CLOUDINARY_NAME=<your_cloudinary_cloud_name>
  * CLOUDINARY_API_KEY=<your_cloudinary_api_key>
  * CLOUDINARY_API_SECRET=<your_cloudinary_api_secret>
  * CURRENCY='USD'
  * STRIPE_PUBLISHABLE_KEY=<your_stripe_publishable_key>
  * STRIPE_SECRET_KEY=<your_stripe_secret_key>
  * STRIPE_WEBHOOK_SECRET=<your_stripe_webhook_secret>

4. Start backend
  * npm run server

5. Frontend Setup
  * cd../client
  * npm install
  * npm run dev

# 🚀 Live Demo
  * Live Website: [Link](https://lms-kzjr.onrender.com/)
  * Demo Video: [Watch Here](https://drive.google.com/drive/u/0/folders/15H-q47X_3lMyCp3pgr6FM5J8WvQNSRkI)
    
# 🖼 Screenshots / Demo

 <img width="1901" height="922" alt="image" src="https://github.com/user-attachments/assets/586dcbfc-347f-4fd6-aee9-23bcf295e56c" />
 <img width="1902" height="918" alt="image" src="https://github.com/user-attachments/assets/f9a0c10e-1e26-4593-9e86-2b909d322c55" />
 <img width="1902" height="927" alt="image" src="https://github.com/user-attachments/assets/34f9a153-3837-4805-8c25-5da3b4808b06" />
 <img width="1887" height="918" alt="image" src="https://github.com/user-attachments/assets/5d1ef4c5-2a57-4045-a707-02bdeded23b7" />
 <img width="1903" height="913" alt="image" src="https://github.com/user-attachments/assets/8574cbb8-892a-4301-8df4-be82ef5d3e51" />
 <img width="1903" height="920" alt="image" src="https://github.com/user-attachments/assets/7869dbbb-9e1d-43f4-a69a-186281bbd495" />
 <img width="1907" height="923" alt="image" src="https://github.com/user-attachments/assets/3ba3d916-120d-4e07-a4fc-21acd5888424" />



# 🚀 Future Improvements

- Add quizzes and assignments.
- Real-time chat between students & instructors.

