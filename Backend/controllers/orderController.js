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

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });

    return res.status(201).json({
      statusCode: 201,
      session_url: session.url,
    });
  } catch (error) {
    console.error("Error placing order:", error);
    next(error);
  }
};

const verifyOrder = async (req, res, next) => {
  try {
    const { orderId, success } = req.body;
    if (success == "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      return res.status(200).json({
        statusCode: 200,
        message: "Paid successfully!",
      });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      return res.status(500).json({
        statusCode: 500,
        message: "Payment failed",
      });
    }
  } catch (error) {
    next(error);
  }
};

// user orders for front end
const userOrders = async (req, res, next) => {
  try {
    const userId = req.body.userId;
    const orders = await orderModel.find({ userId });
    if (!orders)
      return res.status(404).json({
        statusCode: 404,
        message: "Orders empty!",
      });
    return res.status(200).json({
      statusCode: 200,
      data: orders,
    });
  } catch (error) {
    next(error);
  }
};

//listing orders for admin panel
const listOrders = async (req, res, next) => {
  try {
    const orders = await orderModel.find({});
    if (!orders)
      return res.status(404).json({
        statusCode: 404,
        message: `There aren't any orders"`,
      });
    res.status(200).json({
      statusCode: 200,
      data: orders,
    });
  } catch (error) {
    next(error);
  }
};

export { placeOrder, verifyOrder, userOrders, listOrders };
