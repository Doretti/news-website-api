import express, { Application } from "express";
import { config } from "dotenv";
import mongoose from "mongoose";
import router from "./routes/root.route";
config();

export const app: Application = express();

const PORT = process.env.PORT || 8000;

app.use(express.json());

app.use(router);

app.listen(PORT, () => {
  try {
    mongoose.connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.hzn2q.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
    );
    console.log("mongoose is connected");
  } catch (error) {
    console.error(error);
  }

  console.log(`[server]: Server is running at https://localhost:${PORT}`);
});
