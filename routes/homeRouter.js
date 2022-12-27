const homeController = require('../controllers/homeController')
const router = require('express').Router();


router.get('/', homeController.getProducts)

module.exports = router;