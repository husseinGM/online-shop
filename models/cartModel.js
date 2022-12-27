const { default: mongoose } = require('mongoose');
const mogoose = require('mongoose');
const userModel = require('./authModel')

const dbURL = '';

const cartSchema = mogoose.Schema({
    name: String,
    price: Number,
    amount: Number,
    userId: String,
    productId: String,
    userEmail: String,
    status: String,
    timestamp: Number
})

const CartItems = mogoose.model('cart', cartSchema);

exports.addNewProduct = (data) => {
    return new Promise((resolve, reject) => {
        mogoose.connect(dbURL).then(() => {
            CartItems.find({productId: data.productId}).then(product => {
                if(product.length !== 0){
                    return CartItems.updateOne({productId: data.productId},{
                        amount: (+data.amount) + product[0].amount,
                        timestamp: Date.now()
                    })
                }else{
                    let item = new CartItems(data);
                    return item.save()
                }
            }).then(product => {
                mogoose.disconnect(product);
                if(product){ //if we updated the amount of product
                    resolve(product)
                }else{ //if product added first time
                    resolve()
                }
            })
        })
        .catch(err => {
            mogoose.disconnect()
            reject(err)
        })
})}

exports.getItemById = (id) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(dbURL).then(() => {
            return CartItems.find({userId: id},{},{sort: {timestamp: 1}})
        }).then(items => {
            mogoose.disconnect();
            resolve(items)
        }).catch(err => {
            mogoose.disconnect();
            reject(err);
        })
    })
}

exports.cartEdit = (id, newEdit) => {
    return new Promise((resolve, reject) => {
        mogoose.connect(dbURL)
        .then(() => 
            CartItems.updateOne({_id: id}, newEdit)
        ).
        then(item => {
            console.log(item);
            mogoose.disconnect();
            resolve(item)
        })
        .catch(err => {
            reject(err)
        })
    })
}

exports.deleteItem = (id) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(dbURL).then(() => {
            return CartItems.findByIdAndDelete(id);
        }).then(() => {
            mogoose.disconnect();
            resolve();
        }).catch(err => {
            reject(err)
        })
    })
}

exports.getAllOrders = () => {
    return new Promise((resolve, reject) => {
        mogoose.connect(dbURL).then(() => {
            let cartsProduct =  CartItems.find();
            return cartsProduct
        }).then(carts => {
            mogoose.disconnect()
            resolve(carts)
        }).catch(err => {
            mogoose.disconnect()
            reject(err)
        })
    })
}
