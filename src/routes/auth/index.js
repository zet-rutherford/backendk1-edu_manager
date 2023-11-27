var express = require("express");
var router = express.Router();
const passport = require("passport");

const authController = require("../../http/controllers/auth/auth.controller");
const guestMiddleware = require("../../http/middlewares/guest.middleware");

/* GET users listing. */
router.get("/login", guestMiddleware, authController.login);
router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/auth/login",
    successRedirect: "/admin",
  })
);
router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      next();
    }
    res.redirect("/auth/login");
  });
});
router.get("/forgot", authController.forgotPassword);

module.exports = router;
