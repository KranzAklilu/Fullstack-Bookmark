module.exports = {
  checkIfAuthenticated: function (req, res, next) {
    if (req.isAuthenticated()) {
      return res.redirect("/");
    }
    return next();
  },
  checkIfNotAuthenticated: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    return res.redirect("/login");
  },
};
