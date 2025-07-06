import { Purchase } from "../models/Purchase.js";
import  User  from "../models/User.js"
import Course from "../models/Course.js";
import Stripe from 'stripe'

export const getUserData=async(req,res)=>{
    try {
        const { userId } = await req.auth(); // ✅ new way to access userId
        const user=await User.findById(userId);
        if(!user)
        {
            return res.json({success:false,message:'user not found'});

        }
        res.json({success:true,user});

    } catch (error) {
        res.json({success:false,message:error.message});
    }
}

export const userEnrolledCourses=async(req,res)=>{
    try {
        const { userId } = await req.auth(); // ✅ new way to access userId
        const user=await User.findById(userId).populate({path:'enrolledCourses'});
       
        res.json({success:true,enrolledCourses : user.enrolledCourses});

    } catch (error) {
        res.json({success:false,message:error.message});
    }
}

 

export const purchaseCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    const { origin } = req.headers;
    const { userId } = await req.auth();

    // 1. Find user & course
    const userData = await User.findById(userId);
    const courseData = await Course.findById(courseId);

    if (!userData || !courseData) {
      return res.json({ success: false, message: "Data not found" });
    }

    const discountedAmount = Number(
      (courseData.coursePrice - (courseData.discount * courseData.coursePrice) / 100).toFixed(2)
    );

    const newPurchase = await Purchase.create({
      courseId: courseData._id,
      userId,
      amount: discountedAmount
    });

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const currency = process.env.CURRENCY?.toLowerCase() || "inr";

    const line_items = [
      {
        price_data: {
          currency,
          product_data: {
            name: courseData.courseTitle
          },
          unit_amount: Math.floor(newPurchase.amount) * 100
        },
        quantity: 1
      }
    ];

    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/loading/my-enrollments`,
      cancel_url: `${origin}`,
      line_items,
      mode: "payment",
      metadata: {
        purchaseId: newPurchase._id.toString()
      }
    });

    return res.json({ success: true, session_url: session.url });

  } catch (error) {
    console.error("Purchase Error:", error);
    res.json({ success: false, message: error.message });
  }
};
