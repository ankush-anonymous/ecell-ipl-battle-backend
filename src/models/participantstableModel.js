const mongoose = require("mongoose");

const participantstableSchema = new mongoose.Schema({ 
    auctionerID:{
        type:Number,
    },
    teamname: {
        type: String,
        required: [true, 'Please provide name  '],
        maxlength: 50,
        minlength: 3,
      },
      teamlogo: {
        type: String,
      },
      username:{
        type:String,
      },
      password:{
        type:String,
      },
      score:{
        type:Number,
      },
      balanceamount:{
        type:Number,
      },
      Playercount:{
        type:Number,
      },
      Batsmancount:{
        type:Number,
      },
      Bowlercount:{
        type:Number,
      },
      Wicketkeepercount:{
        type:Number,
      },
      Allroundercount:{
        type:Number,
      },
      Overseascount:{
        type:Number,
      },

})

module.exports = mongoose.model("participantstable", participantstableSchema);