const jwt = require("jsonwebtoken");
const configs = require("../configs");

const { PRIVATE_KEY } = configs;

const revokedTokens = [];

const generate = (payload) => {
  return jwt.sign(payload, PRIVATE_KEY, {
    expiresIn: "6h",
  });
};
const verify = (token) => {
  if (revokedTokens.includes(token)) return false;
  return jwt.verify(token, PRIVATE_KEY);
};
const revoke = (token) => {
  revokedTokens.push(token);
};
const decode = (token) => {
  return jwt.decode(token);
};

module.exports = { generate, verify, revoke, decode };
