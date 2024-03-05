require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
//connectDB
const connectDB = require("../db/connect");
const authenticateUser = require("./middleware/authentication");
app.use(express.json());
const cors = require("cors");
const corsOptions = {
  origin: "https://ecell-ipl-battle.vercel.app",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
// Set middleware of CORS
app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://ecell-ipl-battle.vercel.app"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,CONNECT,TRACE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Private-Network", true);
  //  Firefox caps this at 24 hours (86400 seconds). Chromium (starting in v76) caps at 2 hours (7200 seconds). The default value is 5 seconds.
  res.setHeader("Access-Control-Max-Age", 7200);

  next();
});

const PlayerRouter = require("./routes/playersRoutes");
const ParticipantRouter = require("./routes/participantsRoutes");
const auctioneerRouter = require("./routes/auctioneerRoutes");
const SuperUserRouter = require("./routes/superUserRoutes");
const BiddingTransitRouter = require("./routes/biddingTransitRoutes");

// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.get("/", (req, res) => {
  res.send("login");
});

app.use("/api/v1/players", PlayerRouter);
app.use("/api/v1/participants", ParticipantRouter);
app.use("/api/v1/auctioneers", auctioneerRouter);
app.use("/api/v1/superUser", SuperUserRouter);
app.use("/api/v1/bid", BiddingTransitRouter);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);

    app.listen(port, () =>
      console.log(`iplBattle Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

// Middleware for root endpoint
app.get("/", (req, res) => {
  res.send("Server listening successfully on port " + port);
});

start();
