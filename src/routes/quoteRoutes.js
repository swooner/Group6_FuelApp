const express = require('express');
const router = express.Router();
const quoteController = require('../controllers/quoteController');
const authController = require('../controllers/authController');

router.post('/request-quote/:id', authController.protect, quoteController.requestQuote);
router.post('/request-estimate/:id', authController.protect, quoteController.requestEstimate);



module.exports = router;