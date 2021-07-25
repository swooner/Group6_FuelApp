const Quote = require('../models/quoteModel');

const addDays = (date, dayToAdd) => {
    date = new Date();
    const temp = new Date(Number(date));
    temp.setDate(date.getDate() + dayToAdd);

    return `${temp.toLocaleString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric' })}`;
};
const formatDate = (date) => {
    const d = new Date(date);
    month = (d.getMonth() + 1);
    day = d.getDate();
    year = d.getFullYear();
    month.length < 2 ? month = '0' + month : month;
    day.length < 2 ? day = '0' + day : day;
    return [year, month, day].join('-');
};

exports.requestQuote = async (req, res, next) => {
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
    }
    console.log(quote);
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
};

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