const express = require('express');
const router = express.Router();
const quoteController = require('../controllers/quoteController');
const authController = require('../controllers/authController');

router.post('/request-quote/:id', quoteController.requestQuote);



module.exports = router;