const UserModel = require("../models/userModel");
const TokenManager = require("../utils/tokenManager");

const bcrypt = require("bcrypt");

const login = async (req, res) => {
  const { email, password } = req.body;

  let user;

  // Validating
  try {
    if (!email || !password)
      throw new Error("Not all fields have been entered.");
    user = await UserModel.findOne({ email });
    if (!user) throw new Error("User not existed");
    let isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) throw new Error("Credentials wrong");
  } catch (err) {
    return res.status(422).json({
      success: false,
      result: null,
      message: err.message,
    });
  }

  let token = TokenManager.generate({
    email,
  });

  let objUser = user.toObject();
  let sanitizedUser = sanitizeUser(objUser);

  return res.status(200).json({
    success: true,
    message: "Signed in successfully",
    result: {
      token,
      user: sanitizedUser,
    },
  });
};

const logout = async (req, res) => {
  TokenManager.revoke(req.token);

  return res.status(200).json({
    success: true,
    result: null,
    message: "Signed out successfully",
  });
};

const register = async (req, res) => {
  const { email, password, passwordCheck, name } = req.body;

  // Validating
  try {
    if (!email || !password || !passwordCheck || !name)
      throw new Error("Not all fields have been entered.");
    if (password.length < 5)
      throw new Error("The password needs to be at least 5 characters long.");
    if (password !== passwordCheck)
      throw new Error("Enter the same password twice for verification.");

    let emailDoesExist = await UserModel.exists({ email });
    if (emailDoesExist) throw new Error("Email exist");
  } catch (err) {
    return res.status(422).json({
      success: false,
      result: null,
      message: err.message,
    });
  }

  await UserModel.create({
    email,
    password,
    name,
  });

  return res.status(200).json({
    success: true,
    result: null,
    message: "Registered successfully",
  });
};

const sanitizeUser = (user) => {
  let { password, __v, ...sanitizedUser } = user;
  return sanitizedUser;
};

module.exports = { login, logout, register };
