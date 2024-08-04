import foodModel from "../models/foodModel.js";
import fs from "fs";

// add food
const addFood = async (req, res, next) => {
  try {
    const { name, description, price, category } = req.body;
    if (!req.file) {
      return res.status(400).json({
        statusCode: 400,
        message: "Image file is required",
      });
    }
    const image_filename = req.file.filename;
    const food = new foodModel({
      name,
      description,
      price,
      category,
      image: image_filename,
    });
    await food.save();
    return res.status(201).json({
      statusCode: 201,
      message: "Food added successfully",
    });
  } catch (error) {
    next(error);
  }
};

const foodList = async (req, res, next) => {
  try {
    const foods = await foodModel.find({});
    if (!foods)
      return res.status(404).json({ message: "There aren't any foods" });
    return res.status(200).json({
      statusCode: 200,
      data: foods,
    });
  } catch (error) {
    next(error);
  }
};

export { addFood, foodList };
