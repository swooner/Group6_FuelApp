const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

router.post('/sign-in', authController.signIn);
router.post('/sign-up', authController.signUp);
router.get('/sign-out', authController.signOut);
router.get('/settings', authController.protect, userController.getSettings);
router.put('/settings/:id', userController.updateUserInformation);
router.get('/profile', authController.protect, userController.getProfile);
router.get('/request_fuel_quote', authController.protect, userController.getRequestFuelQuote);

module.exports = router;