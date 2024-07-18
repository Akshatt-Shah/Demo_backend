import mongoose from "mongoose";
import express from "express";
import config from "config";
import cors from "cors";
import { route } from "../routes";
const port = String(config.get("PORT"));
const MongoUrl = String(config.get("MongoUrl"));
export function start() {
  try {
    const app = express();
    app.use(express.static(process.cwd() + "/public"));
    app.use(express.json());
    app.use(
      cors({
        origin: "http://localhost:4200",
        credentials: true,
      })
    );
    app.use(route);
    mongoose
      .connect(MongoUrl)
      .then(() => {
        console.log("MongoDB Connected Successfully");
        app.listen(port, () => {
          console.log("Server running on ", port);
        });
      })
      .catch((err: any) => {
        console.log(err.message);
      });
  } catch (error: any) {
    console.log(error.message);
  }
}
