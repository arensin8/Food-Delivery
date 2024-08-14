import {
  addFood,
  foodList,
  removeFood,
} from "../controllers/foodController.js";
import express from "express";

import multer from "multer";

const foodRouter = express.Router();

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

foodRouter.post("/add", upload.single("image"), addFood);
foodRouter.get("/list", foodList);
foodRouter.delete("/remove/:id", removeFood);


export default foodRouter;
