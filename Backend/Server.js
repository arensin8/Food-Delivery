import express from "express";
import cors from "cors";
import { connectToDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import "dotenv/config";
import cartRouter from "./routes/cartRoute.js";

//app config
const app = express();
const PORT = 4000;

// middleware
app.use(express.json());
app.use(cors());

// Db connection
connectToDB();

// api endpoints
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);

app.get("/", (req, res) => {
  res.send("Hello Backend");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

//mongodb+srv://arensin:arensin2002@cluster0.gwixf9b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
