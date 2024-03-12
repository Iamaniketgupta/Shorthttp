const jwt = require("jsonwebtoken");
const secret = process.env.SECRET_KEY;
function setUser(user) {
  return jwt.sign({
    _id: user.id,
    email: user.email,
  }, `${secret}`);  // (payload,secretStamp)
}

function getUser(token) {
  if (!token) return null;
  try {
    return jwt.verify(token, `${secret}`);
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  setUser,
  getUser,
}; 