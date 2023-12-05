const sha1 = require("sha1");
module.exports = {
  createToken: () => {
    return sha1(new Date().getTime() + Math.random());
  },
};
