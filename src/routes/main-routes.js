var express = require('express');
var router = express.Router();

const mainController = require('../controllers/main-controller');

//a futur


/* Tiendanube */
router.get('/', mainController.home);

module.exports = router;
