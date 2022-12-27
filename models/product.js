const mongoose = require('mongoose');

const dbURL = '';
const productSchema = mongoose.Schema({
    name: String,
    image: String,
    price: Number,
    category: String,
    description: String
})
const Product = mongoose.model('product', productSchema);


const getAllProducts = () => {
    return new Promise((resolve, reject) => {
        mongoose.connect(dbURL).then(() => {
            return Product.find()
        }).then(products => {
            resolve(products)
            mongoose.disconnect()
        }).catch(err => reject(err))
    })
}
const getByCategory = (category) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(dbURL).then(() => {
            return Product.find({category: category})
        }).then(products => {
            resolve(products)
            mongoose.disconnect()
        }).catch(err => reject(err))
    })
}

const getProductByID = (id) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(dbURL).then(() => {
            return Product.findById(id)
        }).then(product => {
            resolve(product);
            mongoose.disconnect()
        }).catch(err => reject(err));
    })
}

const getTheFirstProduct = () => {
    return new Promise((resolve, reject) => {
        mongoose.connect(dbURL).then(() => {
            return Product.findOne()
        }).then(product => resolve(product))
        .catch(err => reject(err))
    })
}
const addNewProduct = (productData) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(dbURL).then(() => {
            const newProduct = new Product(productData);
            return newProduct.save();
        }).then(() => {
            resolve()
        }).catch(err => {
            reject(err)
        })
    })

}

module.exports = {getAllProducts, getByCategory, getProductByID, getTheFirstProduct, addNewProduct};