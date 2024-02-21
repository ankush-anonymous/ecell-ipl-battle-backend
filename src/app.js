require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
const cors = require("cors");
//connectDB
const connectDB = require("../db/connect");
const authenticateUser = require("./middleware/authentication");
app.use(express.json());
app.use(cors());

const PlayerRouter =require("./routes/playertableRoutes");
const ParticipantRouter =require("./routes/participantstableRoutes");
const AuctionerRouter =require("./routes/auctionertableRoutes");

// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.get("/", (req, res) => {
  res.send("login");
});

app.use("/api/v1/players", PlayerRouter);
app.use("/api/v1/participants", ParticipantRouter);
app.use("/api/v1/auctioners", AuctionerRouter);

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
