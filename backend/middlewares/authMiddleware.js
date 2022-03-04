const UserModel = require("../models/userModel");
const TokenManager = require("../utils/tokenManager");

const extractTokenFromHeaders = (headers) => {
  const authorizationHeader = headers.authorization;
  if (!authorizationHeader) return null;

  return authorizationHeader.replace("Bearer ", "");
};

module.exports = async (req, res, next) => {
  const token = extractTokenFromHeaders(req.headers);
  if (!token)
    return res.status(401).json({
      message: "Missing token",
    });

  let isVerified;

  try {
    isVerified = TokenManager.verify(token);
  } catch (err) {
    return res.status(401).json({
      message: "Missing token or not authorized",
    });
  }

  if (!isVerified)
    return res.status(401).json({
      message: "Missing token or not authorized",
    });

  const { username } = TokenManager.decode(token);

  const user = await UserModel.findOne({ username })
    .select("-password -__v")
    .exec();

  if (!user)
    return res.status(401).json({
      message: "Unauthorized",
    });

  if (user.deleted_at)
    return res.status(401).json({
      message: "Your account has been deleted.",
    });

  req.user = user;
  req.token = token;

  next();
};
