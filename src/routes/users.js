const express = require('express');
const { getToken } = require( '../models/userModel' );
const router = express.Router();

const userController = require('../controllers/userController');

// GET request for User
router.get('/profile', userController.user_profile_get);

// GET request for updating User settings
router.get('/settings', userController.user_settings_get);

// GET request for change password
router.get('/change_password', userController.user_change_password_get);
// GET request fuel quote
router.get('/request_fuel_quote', userController.user_request_fuel_quote_get);
// POST request for updating User settings
router.post('/settings', getToken, userController.user_settings_post);



module.exports = router;