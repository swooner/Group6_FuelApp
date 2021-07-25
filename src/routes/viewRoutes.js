
const express = require('express');
const router = express.Router();
const viewController = require('../controllers/viewController');
const authController = require('../controllers/authController');

router.get('/', viewController.getIndex);
router.get('/dashboard', authController.protect, viewController.getDashboard);
router.get('/customers', authController.protect, viewController.getCustomers);
router.get('/quotes', authController.protect, viewController.getQuotes);
router.get('/invoices', authController.protect, viewController.getInvoices);
router.get('/payments', authController.protect, viewController.getPayments);
router.get('/users', authController.protect, viewController.getUsers);

module.exports = router;