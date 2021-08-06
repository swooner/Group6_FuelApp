const Quote = require('../models/quoteModel');
const { body, validationResult } = require('express-validator');

const addDays = (date, dayToAdd) => {
    date = new Date();
    const temp = new Date(Number(date));
    temp.setDate(date.getDate() + dayToAdd);

    return `${temp.toLocaleString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric' })}`;
};

exports.addDays = addDays;
const formatDate = (date) => {
    const d = new Date(date);
    month = (d.getMonth() + 1);
    day = d.getDate();
    year = d.getFullYear();
    month.length < 2 ? month = '0' + month : month;
    day.length < 2 ? day = '0' + day : day;
    return [year, month, day].join('-');
};
exports.formatDate = formatDate;

exports.requestQuote = [
    body('gallons').trim().isNumeric().withMessage('Gallon amount must be valid')
        .isFloat({ min: 0.5 }).withMessage('Gallon amount must be valid').escape(),
    body('delivery_date').isISO8601().toDate().withMessage('Delivery date must be valid')
        .isAfter().withMessage('Delivery date must be in future').escape(),
    body('suggested_price', 'Suggested price must be valid').isNumeric().escape(),
    body('amount_due', 'Amount due must be valid').isNumeric().escape(),
    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).render( 'request_fuel_quote', { title: 'Request Fuel', quote: req.body, errors: errors.array() });
            return;
        }
        const { delivery_date } = req.body;
        const newDate = addDays(delivery_date, 30);
        const valid_until = formatDate(newDate);
        const quote_status = 'Requested';
        const id = req.params.id;
        const quote = {
            ...req.body,
            quote_status,
            valid_until,
            ClientInformation_ID: parseInt(id),
        };
        const isQuote = await Quote.submitNewQuote(quote);
        if (isQuote.affectedRows === 1) {
            return res.status(202).json({
                ok: true,
                status: 'success',
                message: 'Successfully submitted the quote request!',
            });
        } else {
            return res.status(400).json({
                ok: false,
                status: 'error',
                message: 'Failed to submit the quote request! Please try again.'
            });
        };

        next();
    }
];

exports.requestEstimate = async (req, res, next) => {
    const id = req.params.id;
    const { gallons, delivery_date } = req.body;
    const estimate = await Quote.getEstimate(id, gallons);
    if (estimate) {

        return res.status(200).json({
            ok: true,
            status: 'success',
            message: 'Your suggested Price and Total Amount Due has been updated',
            estimate
        });

    } else {
        return res.status(400).json({
            ok: false,
            status: 'error',
            message: 'Unable to get your quote at this time! Please try again later.',
        });
    }
    next();
};