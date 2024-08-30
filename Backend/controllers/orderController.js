import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

// Placing user order for front end
const placeOrder = async (req, res, next) => {
  try {
    const frontend_url = "http://localhost:5173";
    const { userId, items, address, amount } = req.body;
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const newOrder = new orderModel({
      userId,
      items,
      address,
      amount,
    });
    await newOrder.save();
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    const line_items = items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: "usd",
        product_data: {
          name: "Delivery charges",
        },
        // 2$ for charges
        unit_amount: 2 * 100,
      },
      quantity: 1,
    });

    const session = await Stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });

    return res.status(201).json({
      statusCode: 201,
      session_url: session.url,
    });
  } catch (error) {
    next(error );
  }
};

export { placeOrder };
