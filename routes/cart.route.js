const router = require("express").Router();
const bodyParser = require("body-parser");
const { isAuth } = require("./guards/auth.guard");
const check = require("express-validator").check;
const cartController = require("../controllers/cartController");

router.get("/", cartController.getCart);

router.post(
  "/",
  isAuth,
  check("amount")
    .notEmpty()
    .withMessage("amount is required")
    .isInt({ min: 1 })
    .withMessage("amount message must be greater than zero"),
  cartController.postCart
);

router.post(
  "/save",
  isAuth,
  check("amount")
    .notEmpty()
    .withMessage("amount is required")
    .isInt({ min: 1 })
    .withMessage("amount message must be greater than zero"),
  cartController.postSave
);

router.post("/delete", isAuth, cartController.cartDelete);



module.exports = router;
