import express from "express";
import connection from "./dataBase/dbconnection.js";
import authRouter from "./Route/authRoute.js";
import blogRouter from "./Route/blogRoute.js";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use("/file", express.static(path.join(__dirname, "uploads")));

const port = 8000;
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", authRouter);
app.use("/", blogRouter);
app.listen(port, () => {
  connection();
  console.log(`server started at port ${port}`);
});
