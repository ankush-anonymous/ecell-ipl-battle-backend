const { StatusCodes } = require("http-status-codes");
const testRepository = require("../repository/testRepository");

const postName = async (req, res) => {
  try {
    const { name } = req.body; // Destructure 'name' from req.body
    const result = await testRepository.postName(name); // Pass 'name' to the repository function
    res.status(StatusCodes.OK).json(result);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Error posting name", error: error.message });
  }
};

module.exports = {
  postName,
};
