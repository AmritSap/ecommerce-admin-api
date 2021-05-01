import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import path from "path"
dotenv.config();
const app = express();
import cors from "cors";
const PORT = process.env.PORT || 8000;
app.use(cors());
app.use(morgan("tiny"));

const __dirname =path.resolve()
app.use(express.static(path.join(__dirname, "public")));
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

// parse application/json
app.use(express.json());

////////// dATABASE//////////////////////
import mongoClient from "./config/db.js";
mongoClient();

// /////////////////Middlewares////////////////
import { userAuthorization } from "./middlewares/authorization.middleware.js";

// //////////////////////////////// LOAD ROUTERS//////////////////////
import loginRouter from "./routers/login.router.js";
import userRouter from "./routers/user.router.js";
import categoryRouter from "./routers/category.router.js";
import productRouter from "./routers/product.router.js"
import tokenRouter from "./routers/token.router.js";

// ///////////////////////////////// USE APIS//////////////////////////////
app.use("/api/v1/login", loginRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/category",userAuthorization, categoryRouter);
app.use("/api/v1/product",userAuthorization, productRouter);
app.use("/api/v1/token", tokenRouter);



app.get("/", function (req, res) {
  res.send("Hello World");
});

//404 return
app.use((req, res, next) => {
  const error = new Error("resources not found");
  error.status = 404;

  next(error);
});

// handle error
import { handleError } from "./utils/errorHandler.js";
app.use((error, req, res, next) => {
  handleError(error, res);
});

app.listen(PORT, (error) => {
  if (error) console.log(error);
  console.log(`Server is running at http://localhost:${PORT}`);
});
