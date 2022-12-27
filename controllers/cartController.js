const cartModel = require('../models/cartModel');
const validationResult = require('express-validator').validationResult;

const getCart = (req, res, next) => {
    cartModel.getItemById(req.session.userId).then(items => {
        res.render('cart', {
            items,
            pageTitle: "Cart",
            isUser: true,
            isAdmin: req.session.isAdmin
        })
    }).catch(err => next(err))
}

const postCart = (req, res, next) => {
    if(validationResult(req).isEmpty()){
        cartModel.addNewProduct({
            name: req.body.name,
            price: req.body.price,
            amount: req.body.amount,
            userId: req.session.userId,
            userEmail: req.body.email,
            productId: req.body.productId,
            status: "pending",
            timestamp: Date.now()
        }).then(item => {
            res.redirect('cart')
        }).catch(err => console.log(err))
    }else{
        req.flash('validationError', validationResult(req).array());
        res.redirect('/')
    }
}

const postSave = (req, res, next) => {
    let updatedAmount = +req.body.amount;
    if(validationResult(req).isEmpty()){
        cartModel.cartEdit(req.body.cartId, {
            amount: updatedAmount,
            timestamp: Date.now()
        }).then(() => res.redirect('/cart')).catch(err => console.log(err))
    }else{
        req.flash('validationError', validationResult(req).array());
        res.redirect('/cart')
    }
}

const cartDelete = (req, res, next) => {
    cartModel.deleteItem(req.body.cartId).then(() => res.redirect('/cart'))
    .catch(err => next(err))
}


module.exports = {postCart, postSave, cartDelete, getCart}