import { Webhook } from 'svix';
import User from "../models/User.js";
import Stripe from 'stripe';
import Course from '../models/Course.js';
import { Purchase } from '../models/Purchase.js';

export const clerkWebHooks = async (req, res) => {
  try {
    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    const payload = JSON.stringify(req.body);
    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    };

    wh.verify(payload, headers);

    const { data, type } = req.body;

    switch (type) {
      case "user.created": {
        const userData = {
          _id: data.id,
          email: data.email_addresses?.[0]?.email_address || "",
          name: `${data.first_name || ""} ${data.last_name || ""}`,
          imageUrl: data.image_url,
        };

        await User.create(userData);
        return res.status(200).json({ success: true });
      }

      case "user.updated": {
        const updatedData = {
          email: data.email_addresses?.[0]?.email_address || "",
          name: `${data.first_name || ""} ${data.last_name || ""}`,
          imageUrl: data.image_url,
        };

        await User.findByIdAndUpdate(data.id, updatedData);
        return res.status(200).json({ success: true });
      }

      default:
        return res.status(200).json({ message: "Unhandled event type" });
    }
  } catch (error) {
    console.error("Webhook error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};
const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);

export const stripeWebhooks = async (req, res) => {
  console.log('🔥 Stripe webhook endpoint hit');

  const sig = req.headers['stripe-signature'];
  let event;

  try {
    // Correct: construct event first
    event = Stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    console.log('✅ Webhook received:', event.type);

    // Recommended: use checkout.session.completed instead of payment_intent
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;

      const purchaseId = session.metadata?.purchaseId;
      console.log('🧾 Metadata purchaseId:', purchaseId);

      if (!purchaseId) {
        console.error('❌ purchaseId missing in metadata');
        return res.status(400).json({ error: 'Missing purchaseId' });
      }

      const purchaseData = await Purchase.findById(purchaseId);
      if (!purchaseData) {
        console.error('❌ Purchase not found');
        return res.status(404).json({ error: 'Purchase not found' });
      }

      purchaseData.status = 'completed';
      await purchaseData.save();

      console.log('✅ Purchase marked as completed');
    }

    // Optional: handle failed intent
    if (event.type === 'payment_intent.payment_failed') {
      const paymentIntent = event.data.object;

      const sessionList = await stripeInstance.checkout.sessions.list({
        payment_intent: paymentIntent.id
      });

      const session = sessionList.data[0];
      const purchaseId = session?.metadata?.purchaseId;

      if (purchaseId) {
        const purchaseData = await Purchase.findById(purchaseId);
        if (purchaseData) {
          purchaseData.status = 'failed';
          await purchaseData.save();
          console.log('❌ Purchase marked as failed');
        }
      }
    }

    res.status(200).json({ received: true });
  } catch (error) {
    console.error('❌ Stripe webhook error:', error.message);
    res.status(400).send(`Webhook Error: ${error.message}`);
  }
};
