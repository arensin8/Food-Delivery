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
    const userData = await userModel.findById(userId);
    let cartData = userData.cartData;
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
// remove items from user's cart
const removeFromCart = async (req, res, next) => {
  try {
    const itemId = req.body.itemId;
    const userId = req.body.userId;
    if (!itemId) {
      return res.status(400).json({
        statusCode: 400,
        message: "Item ID are required!",
      });
    }
    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.status(404).json({
        statusCode: 404,
        message: "User not found!",
      });
    }
    let cartData = userData.cartData;
    if (cartData[itemId] && cartData[itemId] > 0) {
      cartData[itemId] -= 1;
      // Remove item from cart if quantity reaches zero
      if (cartData[itemId] === 0) {
        delete cartData[itemId];
      }
      const response = await userModel.findByIdAndUpdate(userId, { cartData });
      if (!response) {
        return res.status(500).json({
          statusCode: 500,
          message: "Removing item from cart failed!",
        });
      }
      return res.status(200).json({
        statusCode: 200,
        message: "Item removed successfully",
        cartData: response.cartData,
      });
    } else {
      return res.status(400).json({
        statusCode: 400,
        message: "Item not found in cart or quantity is already zero",
      });
    }
  } catch (error) {
    next(error);
  }
};

// get user cart items
const getCartItems = (req, res, next) => {};

export { addToCart, removeFromCart, getCartItems };
