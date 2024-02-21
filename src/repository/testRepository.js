const User = require("../models/testModel");

const postName = async (name) => {
  const result = await User.create({
    name,
  });
  return result;
};
module.exports = {
  postName,
};
