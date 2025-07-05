import mongoose from "mongoose";

const PurchaseSchema=new mongoose.Schema({
    couseId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Course',
        required:true
    },
    userId:{
        type:String,
        ref:'User',
        required:true
    },

    status:{
        type:String,
        enum:['pending','rejected','completed'],
        default:'pending'
    },
    amount:{
        type:Number,
        required:true
    }
},{timestamps:true})

export const Purchase=mongoose.model('Purchase',PurchaseSchema)