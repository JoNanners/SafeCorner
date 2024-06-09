const jwt = require("jsonwebtoken");
const User = require("../models/users");
const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ error: "Please authenticate" });
  }

  //   console.log("token from middleware", token);

  const jwtToken = token.replace("Bearer", "").trim();
  console.log("jwtToken from middleware", jwtToken);

  try {
    const isVerified = jwt.verify(jwtToken, process.env.JWT_TOKEN);
    const userData = await User.findOne({ email: isVerified.email }).select({
      password: 0,
    });
    console.log(userData);
    req.user = userData;
    req.token = token;
    req.userID = userData._id;

    console.log(req.user);
    console.log(req.token);
    console.log(req.userID);
    next();
  } catch (error) {
    console.log(error);
    res.status(401).send({ error: "Unauthorized token", message: error });
  }
};

module.exports = authMiddleware;
