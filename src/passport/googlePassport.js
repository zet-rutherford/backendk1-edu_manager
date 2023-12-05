const GoogleStrategy = require("passport-google-oidc");
const { User_Social, User } = require("../models/index");
module.exports = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
    scope: ["profile", "email"],
    passReqToCallback: true,
  },
  async (req, issuer, profile, cb) => {
    const { displayName, emails, id } = profile;
    // console.log(468464);
    console.log(profile);

    const userSocial = await User_Social.findOne({
      where: { providerId: id },
    });
    // console.log(userSocial);
    console.log(req.isAuthenticated());
    // console.log(req);
    // Status : not logged in yet
    if (!req.isAuthenticated()) {
      const user = await User?.findByPk(userSocial?.userId);
      // console.log(user);
      if (user) {
        console.log(`Gan user vao req`);
        return cb(null, { user, userSocial });
      } else {
        return cb(null, false, {
          message: "Đăng nhập thất bại. Tài khoản chưa được liên kết",
        });
      }
    }
    // status : log in
    else {
      console.log(6666);
      if (userSocial) {
        console.log(888);
        req.flash(
          "error",
          "Liên kết thất bại! Tài khoản google này đã được liên kết với một tài khoản khác."
        );
        return res.redirect("/admin");
      } else {
        User_Social.create({
          userId: req.user.id,
          provider: "google",
          providerId: id,
        });
        req.flash("success", "Liên kết thành công!");

        // req.res.redirect("/admin");
        // return;
        let user = req.user;
        const userSocial = null;
        return cb(null, { user, userSocial });
      }
    }
  }
);
