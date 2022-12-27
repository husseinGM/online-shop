const productModel = require('../models/product');

const getProduct = (req, res, next) => {
    const id = req.params.id;
    productModel.getProductByID(id).then(product => {
        res.render('product', {
            product,
            pageTitle: "Product",
            isAdmin: req.session.isAdmin,
            isUser: req.session.userId
        })
    })     
}

const getFirstProduct = (req, res, next) => {
    productModel.getTheFirstProduct().then(product => {
        res.render('product', {product, isUser: req.session.userId, isAdmin: req.session.isAdmin})
    }).catch(err => next(err))
}

module.exports = {getProduct, getFirstProduct}