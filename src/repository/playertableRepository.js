
const  = require("../models/playertableModel.js")


//sample
const postName = async (name) => {
const result = await User.create({
name,
});
return result;
};
module.exports = {
postName,
};