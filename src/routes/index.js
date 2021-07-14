
const express = require('express');
const router = express.Router();
const viewController = require('../controllers/viewController');
const quoteController = require('../controllers/quoteController');

router.get('/', viewController.getIndex );

// POST request for creating User
router.post( '/sign-up', viewController.signUp_post );

// POST request for loggin-in User
router.post( '/login', viewController.login_post );

// GET request for Quote Request Form
router.get( '/request-quote', quoteController.quote_request_get );

// POST request for Quote Request Form
router.post( '/request-quote', quoteController.quote_request_post );

// GET request for Dashboard
router.get( '/dashboard', viewController.dashboard_get );


module.exports = router;