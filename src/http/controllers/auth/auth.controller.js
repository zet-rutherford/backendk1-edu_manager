const mailer = require("../../../utils/mailer");
const otp = require("../../../utils/otp");
const model = require("../../../models/index");
const token = require("../../../utils/token");
const jwt = require("jsonwebtoken");

module.exports = {
  login: (req, res) => {
    const { redirect } = req.query;

    return res.render("auth/login", { layout: "layouts/auth.layout.ejs" });
  },
  handleLogin: async (req, res, next) => {
    const { email } = req.body;
    try {
      const user = await model.User.findOne({ where: { email } });
      var OTPcode = otp.generate();
      console.log(OTPcode);
      await model.User_Otp.destroy({ where: { userId: user.id } });
      await model.User_Otp.create({
        otp: OTPcode,
        userId: user.id,
        expiredAt: new Date() + 3 * 60 * 1000,
      });
    } catch (exception) {
      console.log(exception);
    }

    mailer.sendOTP(email, OTPcode);
    //token
    let userToken = await model.Login_Token.findOne({
      where: { userId: req.user.id },
    });
    if (!userToken) {
      newToken = token.createToken();
      userToken = await model.Login_Token.create({
        userId: req.user.id,
        token: newToken,
      });
      res.cookie("token", newToken);
      return res.redirect("/auth/verify");
      // return;
    }
    //neu co token
    await model.Login_Token.destroy({ where: { userId: req.user.id } });
    newToken = token.createToken();
    await model.Login_Token.create({ userId: req.user.id, token: newToken });
    res.cookie("token", newToken);

    return res.redirect("/auth/verify");
  },
  verify: (req, res) => {
    const msg = req.flash("msg");
    return res.render("auth/verifyOtp", {
      layout: "layouts/auth.layout.ejs",
      msg,
    });
  },
  handleVerify: async (req, res) => {
    const { otp } = req.body;
    const userOtp = await model.User_Otp.findOne({
      where: { userId: req.user.id },
    });
    const currentTime = new Date();
    console.log(currentTime);
    if (currentTime.getUTCDate() < userOtp.expiredAt) {
      if (otp === userOtp.otp) {
        console.log("otp chinh xac");
        await model.User_Otp.destroy({ where: { userId: req.user.id } });
        const user = await model.User.findOne({ where: { id: req.user.id } });
        console.log(user.typeId);
        // if (user.typeId === 1) {
        //   return res.redirect("/admin");
        // } else if (user.typeId === 2) {
        //   return res.redirect("/teacher");
        // } else if (user.typeId === 3) {
        //   return res.redirect("/student");
        // }
        return res.redirect("/admin");
      }
      req.flash("msg", "ma otp khong chinh xac");
      return res.redirect("/auth/verify");
    }
    console.log("Token het han");
    req.flash("msg", "het thoi gian xac minh");
    return res.redirect("/auth/login");
  },
  forgotPassword: (req, res) => {
    const msg = req.flash("msg");
    res.render("auth/forgot-password", {
      layout: "layouts/auth.layout.ejs",
      msg,
    });
  },
  handleForgot: async (req, res) => {
    const { email } = req.body;
    const user = model.User.findOne({ where: { email } });
    if (user) {
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "15m",
      });
      mailer.sendForgot(email, token);
      return res.render("auth/sendMailReset", {
        layout: "layouts/auth.layout.ejs",
      });
    } else {
      req.flash("msg", "khong ton tai email");
      return res.redirect("auth/forgot");
    }
  },
  resetPassword: (req, res) => {
    const error = req.flash("error");
    res.render("auth/resetPassword", {
      layout: "layouts/auth.layout.ejs",
      error,
    });
  },
  handleReset: async (req, res) => {
    const { token } = req.params;
    const { passwordNew, rePassword } = req.body;
    if (!passwordNew || !rePassword) {
      req.flash("error", "Vui lòng nhập đầy đủ thông tin");
      res.redirect("/forgot-password/verify/" + token);
    } else if (passwordNew !== rePassword) {
      req.flash("error", "Mật khẩu nhập lại không khớp");
      res.redirect("/forgot-password/verify/" + token);
    } else {
      var decoded = jwt.verify(token, "secret");
      if (decoded) {
        const salt = 10;
        bcrypt.hash(passwordNew, salt, async function (err, hash) {
          await model.User.update(
            { password: hash },
            {
              where: {
                id: decoded.id,
              },
            }
          );
        });
        req.flash("success", "Thay đổi mật khẩu thành công");

        res.redirect("/auth/login");
      } else {
        res.send("<h1>Link xác thực đã hết hạn hoặc không tồn tại</h1>");
      }
    }
  },
  googleCb: async (req, res) => {
    console.log(`google CB`);
    console.log(req.user);
    const userToken = token.createToken();
    res.cookie("loginToken", userToken, { maxAge: 900000, httpOnly: true });

    console.log(`google CB end`);
    if (req.user.typeId === 3) {
      return res.redirect("/student");
    } else if (req.user.typeId === 2) {
      return res.redirect("/teacher");
    } else if (req.user.typeId === 1) {
      console.log(`google CB end`);
      return res.redirect("/admin");
    }
  },
  disableGoogle: async (req, res) => {
    console.log(req.user);
    // const id = req.user.user.id;
    // await UserSocial.destroy({
    //   where: {
    //     [Op.and]: [{ userId: id }, { provider: "google" }],
    //   },
    // });
    req.flash("success", "Xóa liên kết thành công");
    res.redirect("/admin");
  },
};
