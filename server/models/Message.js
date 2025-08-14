import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    chatId: {
        type: String, 
        required: true,
    },
    senderId: {
        type: String, 
        required: true,
    },
    message: {
        type: String,
        required: true,
    },

})

export default mongoose.model('Message', messageSchema);