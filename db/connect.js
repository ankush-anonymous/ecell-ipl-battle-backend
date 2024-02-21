const mongoose = require("mongoose");

const connectDB = (url) => {
  return mongoose.connect(url, {
    // useNewUrlParser: true, // No longer necessary but included for compatibility
    // useUnifiedTopology: true, // No longer necessary but included for compatibility
  });
};

module.exports = connectDB;
