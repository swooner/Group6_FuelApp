
const express = require('express');
const router = express.Router();
const viewController = require('../controllers/viewController');
const authController = require('../controllers/authController');

router.get('/', viewController.getIndex);
router.get('/dashboard', authController.protect, authController.restricted, viewController.getDashboard);
router.get('/customers', authController.protect, authController.restricted, viewController.getCustomers);
router.get('/quotes', authController.protect, authController.restricted, viewController.getQuotes);
router.get('/invoices', authController.protect, authController.restricted, viewController.getInvoices);
router.get('/payments', authController.protect, authController.restricted, viewController.getPayments);
router.get('/users', authController.protect, authController.restricted, viewController.getUsers);

module.exports = router;