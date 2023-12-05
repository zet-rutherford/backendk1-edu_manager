var express = require("express");
var router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");

const authController = require("../../http/controllers/auth/auth.controller");
const guestMiddleware = require("../../http/middlewares/guest.middleware");
const googlePassportMiddleware = require("../../http/middlewares/google.middleware");
/* GET users listing. */
router.get("/login", guestMiddleware, authController.login);
router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/auth/login",
    // successRedirect: "/admin",
  }),
  authController.handleLogin
);
router.get("/verify", authController.verify);
router.post("/verify", authController.handleVerify);
router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      next();
    }
  });
  return res.redirect("/auth/login");
});
router.get("/forgot", authController.forgotPassword);
router.post("/forgot", authController.handleForgot);
router.get(
  "/verify/:token",
  guestMiddleware,
  function (req, res, next) {
    const { token } = req.params;
    try {
      var decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (decoded) {
        next();
      }
    } catch (error) {
      res.send("<h1>Link xác thực đã hết hạn hoặc không tồn tại</h1>");
    }
  },
  authController.resetPassword
);
router.post(
  "/verify/:token",
  guestMiddleware,
  function (req, res, next) {
    const { token } = req.params;

    try {
      var decoded = jwt.verify(token, "secret");
      if (decoded) {
        next();
      }
    } catch (err) {
      res.send("<h1>Link xác thực đã hết hạn hoặc không tồn tại</h1>");
    }
  },
  authController.handleReset
);
router.get("/google/redirect", passport.authenticate("google"));
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/auth/login",
    failureFlash: true,
    successFlash: true,
  }),
  googlePassportMiddleware,
  authController.googleCb
);

router.get("/disableGoogle", authController.disableGoogle);

module.exports = router;
