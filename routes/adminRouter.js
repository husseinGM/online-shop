const router = require("express").Router();
const check = require("express-validator").check;
const adminController = require("../controllers/adminController");
const multer = require("multer");
const { adminGuard } = require("./guards/admin.guard");

router.get("/add", adminGuard, adminController.getAdd);
router.post(
  "/add",
  adminGuard,
  multer({
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, "images");
      },
      filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
      },
    }),
  }).single("image"),
  check().custom((value, { req }) => {
    if (req.file) return true;
    else throw Error("image is required");
  }),
  adminController.postAdd
);

router.get('/orders', adminGuard, adminController.getOrders)

module.exports = router;
