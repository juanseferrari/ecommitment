var express = require('express');
var router = express.Router();

const mainController = require('../controllers/main-controller');


/* Home */
router.get('/', mainController.home);
router.get('/demo1', mainController.demo1);


/** APIS */
router.get('/api/product-data', mainController.productData);
router.post('/api/calculator', mainController.calculator);


module.exports = router;
