import userModel from "../models/userModel.js";

// add items to users cart
const addToCart = async (req, res, next) => {
  try {
    const userId = req.body.userId;
    if (!userId)
      return res.status(404).json({
        statusCode: 404,
        message: "User not found!",
      });
    const userData = await userModel.findOne({ _id: userId });
    let cartData = userData.cartData;
    console.log(req.body.itemId);
    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }
    const response = await userModel.findByIdAndUpdate(userId, { cartData });
    if (!response) {
      return res
        .status(500)
        .json({ statuCode: 500, message: "Adding to cart failed!" });
    }
    return res.status(200).json({ statuCode: 200, message: "Added to cart" });
  } catch (error) {
    next(error);
  }
};

// remove items from users cart
const removeFromCart = (req, res, next) => {};

// get user cart items
const getCartItems = (req, res, next) => {};

export { addToCart, removeFromCart, getCartItems };
