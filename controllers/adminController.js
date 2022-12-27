const { validationResult } = require("express-validator")
const productModel = require('../models/product');
const cartModel = require('../models/cartModel');
const userModel = require('../models/authModel');
const getAdd = (req, res, next) => {
    res.render('addProduct', {
        validationErr: req.flash('validationErrors'),
        pageTitle: "Add Product",
        isUser: true,
        isAdmin: true
    })
}
const postAdd = (req, res, next) => {
    let product = {
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        category: req.body.category,
        image: req.file.filename
    }
    if(validationResult(req).isEmpty()){
        productModel.addNewProduct(product).then(() => {
            res.redirect('/');
        }).catch(err => {
            next(err)
        })
    }
}

let usersEmail = [];
const getOrders = (req, res, next) => {
    cartModel.getAllOrders().then((carts) => {
        res.render('orders', {
            pageTitle: "Orders",
            carts: carts,
            isUser: req.session.userId,
            isAdmin: req.session.isAdmin
        })
        console.log(usersEmail)
    }).catch(err => next(err))
}

module.exports = {getAdd, postAdd, getOrders}