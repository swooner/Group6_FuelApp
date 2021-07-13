
const express = require( 'express' );
const router = express.Router();

const userController = require( '../controllers/userController' );

// GET request for User
router.get( '/user', userController.user_profile_get );

// GET request for updating User settings
router.get( '/user/profile', userController.user_settings_get );

// POST request for updating User settings
router.post( '/user/settings', userController.user_settings_post );

module.exports = router;