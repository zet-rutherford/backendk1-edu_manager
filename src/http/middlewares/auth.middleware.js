const model = require("../../models/index");
const Login_Token = model.Login_Token;

module.exports = async (req, res, next) => {
  if (!req.user) {
    return res.redirect("/auth/login");
  }
  next();
  // next();
  console.log(123);
  console.log(req.user.user.id);
  const userCookie = req.cookies;
  const userToken = await Login_Token.findOne({
    where: { userId: req.user.user.id },
  });
  if (userToken.token === userCookie.token) {
    console.log("Token hop le");
    next();
    return;
  } else {
    console.log("Token eo hop le");
    req.logout((err) => {
      if (err) {
        next();
        return;
      }
    });
    return res.redirect("/auth/login");
  }
};
