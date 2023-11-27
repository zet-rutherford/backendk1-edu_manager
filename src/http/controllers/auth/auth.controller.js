module.exports = {
  login: (req, res) => {
    const { redirect } = req.query;
    const msg = req.flash("error");
    res.render("auth/login", { layout: "layouts/auth.layout.ejs" });
  },
  forgotPassword: (req, res) => {
    res.render("auth/forgot-password", { layout: "layouts/auth.layout.ejs" });
  },
};
