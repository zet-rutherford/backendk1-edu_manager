const { User_Social } = require("../../models/index");
module.exports = async (req, res, next) => {
  console.log(`gg middleware`);

  if (!req.userSocial) {
    req.flash(
      "error",
      "Đăng nhập bằng Google không thành công! tài khoản chưa được liên kết.Tài khoản chưa được liên kết"
    );
    res.redirect("/auth/login");
    return;
  }
  next();
};
