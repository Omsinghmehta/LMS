import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema({
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true
    },
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    instructorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

}, { timestamps: true });

const Chat = mongoose.model('Chat', chatSchema);
export default Chat;