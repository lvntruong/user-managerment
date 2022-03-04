const jwt = require("jsonwebtoken");

const revokedTokens = [];

const generate = (payload) => {
  return jwt.sign(payload, process.env.PRIVATE_KEY, {
    expiresIn: "6h",
  });
};
const verify = (token) => {
  if (revokedTokens.includes(token)) return false;
  return jwt.verify(token, process.env.PRIVATE_KEY);
};
const revoke = (token) => {
  revokedTokens.push(token);
};
const decode = (token) => {
  return jwt.decode(token);
};

module.exports = { generate, verify, revoke, decode };
