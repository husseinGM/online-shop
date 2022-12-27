const authController = require("../controllers/authController");
const { isAuth, notAuth } = require("./guards/auth.guard");
const router = require("express").Router();
const check = require("express-validator").check;

router.get("/signup", notAuth, authController.getSignup);
router.post(
  "/signup",
  check("username").not().isEmpty(),
  check("email")
    .not()
    .isEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("in correct email foramt"),
  check("password").isLength({ min: 3 }),
  check("rePassword").custom((value, { req }) => {
    if (value === req.body.rePassword) {
      return true;
    } else {
      throw "Password is not same";
    }
  }),
  notAuth,
  authController.postSignup
);

router.get("/login", notAuth, authController.getLogin);
router.post(
  "/login",
  notAuth,
  check("email")
    .not()
    .isEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("email is incorrect"),
  check("password").isLength({ min: 3 }),
  authController.postLogin
);
router.all("/logout", isAuth,authController.logOut);
module.exports = router;
