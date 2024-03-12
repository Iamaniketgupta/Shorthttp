const { getUser } = require("../util/auth");

async function validateLoggedUser(req, res, next) {
  const token = req.cookies?.authId;
  if (!token) return res.redirect("/url/login");

  const user = getUser(token);
  if (!user) return res.redirect("/url/login");

  req.user = user;  //sending req.user
  next();
}

async function checkAuth(req, res, next) {
  try {
    const token = req.cookies?.authId;
    const user = getUser(token);  //util jwt verify
    req.user = user;
  } catch (error) {
    console.log(error)
  }
  finally {
    next();
  }
}

module.exports = {
  validateLoggedUser,
  checkAuth,
};