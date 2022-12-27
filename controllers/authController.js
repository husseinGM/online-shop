const authModel = require("../models/authModel");
const validationResult = require("express-validator").validationResult;

const getSignup = (req, res) => {
  res.render("signup", {
    validationErr: req.flash("validationErr"),
    pageTitle: 'Signup',
    isUser: false,
    isAdmin: false
  });
};

const postSignup = (req, res) => {
  if (validationResult(req).isEmpty()) {
    authModel
      .createNewUser(req.body.username, req.body.email, req.body.password)
      .then(() => {
        req.session.email = req.body.email
        res.redirect("/login");
      })
      .catch((err) => {
        res.redirect("/signup");
      });
  } else {
    req.flash("validationErr", validationResult(req).array());
    res.redirect("/signup");
  }
};
const postLogin = (req, res) => {
  if(validationResult(req).isEmpty()) {
    authModel
      .Login(req.body.email, req.body.password)
      .then((result) => {
        req.session.email = req.body.email
        req.session.userId = result.id;
        req.session.isAdmin = result.isAdmin
        res.redirect("/");
      })
      .catch((err) => {
        req.flash("authError", err);
        res.redirect("/login");
      });
  } else {
    req.flash("loginErr", validationResult(req).array());
    res.redirect('/login')
  }
};
const getLogin = (req, res) => {
  res.render("login", {
    authError: req.flash("authError")[0],
    loginErr: req.flash("loginErr"),
    pageTitle: "Login",
    isUser: false,
    isAdmin: false
  });
};
const logOut = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};
module.exports = {
  getSignup,
  postLogin,
  postSignup,
  getLogin,
  logOut,
};
