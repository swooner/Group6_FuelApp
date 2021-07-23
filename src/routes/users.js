
const express = require('express');
const { getToken } = require( '../models/userModel' );
const router = express.Router();

const userController = require('../controllers/userController');

// GET request for User
router.get('/profile', userController.user_profile_get);

// GET request for updating User settings
router.get('/settings', userController.user_settings_get);

// POST request for updating User settings
router.post('/settings', getToken, userController.user_settings_post);



module.exports = router;