const mongoose = require("mongoose");

const auctionertableSchema = new mongoose.Schema({ 

username: {
type: String,
required: [true, "Please provide name"],
maxlength: 50,
minlength: 3,
},
password:{
    type:String,
    required: [true, "Please provide name"],
maxlength: 50,
minlength: 3,
},
currentplayercount:{
    type:Number,
},

})

module.exports = mongoose.model("auctionertable", auctionertableSchema);