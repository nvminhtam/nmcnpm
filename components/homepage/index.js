var express = require('express');
var router = express.Router();
const homepageController = require('./homepageController');

/* GET home page. */
router.get('/', homepageController.homepage);


module.exports = router;