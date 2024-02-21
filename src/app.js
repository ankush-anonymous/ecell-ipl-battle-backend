require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
const cors = require("cors");

//connectDB
const connectDB = require("../db/connect");
const authenticateUser = require("./middleware/authentication");

//routers
const NameRouter = require("./routes/testRoutes");

app.use(express.json());
app.use(cors());

//routes
app.use("/api/v1/test", NameRouter);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);

    app.listen(port, () =>
      console.log(`LenderApp Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
