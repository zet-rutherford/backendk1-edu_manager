module.exports = {
  index: (req, res) => {
    return res.render("admin/dashboard/index");
  },
  settings: (req, res) => {
    return res.render("admin/dashboard/settings");
  },
};
