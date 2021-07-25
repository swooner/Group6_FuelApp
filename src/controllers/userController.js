const catchAsync = require('./../utils/catchAsync');
const multer = require('multer');
const User = require('../models/userModel');

exports.getSettings = (req, res, next) => {
    res.status(200).render('settings', {
        title: 'SuperFule | User Information',
    });
}
exports.getProfile = async (req, res, next) => {

    const history = await User.findQuoteHistory(res.locals.user.ID);
    console.log(history);

    res.status(200).render('profile', {
        title: 'SuperFule | User Profile',
    });
}
exports.updateUserInformation = async (req, res, next) => {
    const userInfo = { ...req.body };
    let total_completed = 0;
    for (const key in userInfo) {
        if (userInfo[key] !== null && userInfo[key] !== undefined && userInfo[key] !== '') {
            total_completed++;
        }
    }
    let profile_percentage = parseFloat((total_completed / 11)).toFixed(2);
    userInfo.profile_percentage = profile_percentage;
    const result = await User.updateUserInformation(req.params.id, userInfo);
    if (result.affectedRows === 1) {
        return res.status(202).json({
            ok: true,
            status: 'success',
            message: 'Successfully update user information',
        });
    } else {
        res.status(400).json({
            ok: false,
            status: 'error',
            message: 'Error occured while trying to update user information! Please try again.',
        });
    }
    next();
};

exports.getRequestFuelQuote = (req, res, next) => {
    res.render(`request_fuel_quote`, {
        title: `SuperFuel | Request Fuel Quote Form`,
    });
}