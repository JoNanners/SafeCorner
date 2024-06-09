require("dotenv").config();
const express = require("express");
const app = express();
const router = require("./router/authentication-router");
const connectDb = require("./utils/db");
const errorMiddleware = require("./middlewares/error-middleware");
const cors = require("cors");

// CORS is DONE
const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json()); //its a middleware that lets you parse json data. applied at beginning of all code

// to beautify server.js we use router
app.use("/", router);

const PORT = 5000;

app.use(errorMiddleware);

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
});
