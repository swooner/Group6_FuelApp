
const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

// GET request for User
router.get('/profile', userController.user_profile_get);

// GET request for updating User settings
router.get('/settings', userController.user_settings_get);

// POST request for updating User settings
router.post('/settings', userController.user_settings_post);

router.get('/request_fuel_quote', userController.request_fuel_quote_get);



module.exports = router;