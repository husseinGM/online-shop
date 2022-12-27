const productController = require('../controllers/productControllers')
const router = require('express').Router();

router.get('/', productController.getFirstProduct)
router.get('/:id', productController.getProduct)

module.exports = router;