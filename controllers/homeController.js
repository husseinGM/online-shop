const productModel = require("../models/product");

const getProducts = (req, res, next) => {
  let category = req.query.category;
  let productPromise;
  if (category && category !== "all") {
    productPromise = productModel.getByCategory(category);
  } else {
    productPromise = productModel.getAllProducts();
  }
  productPromise
    .then((products) => {
      res.render("index", {
        products,
        pageTitle: "Home",
        isUser: req.session.userId,
        validationErr: req.flash("validationError")[0],
        isAdmin: req.session.isAdmin,
        email: req.session.email
      });
    })
    .catch((err) => next(err));
};
module.exports = {
  getProducts,
};
