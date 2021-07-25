const catchAsync = require('./../utils/catchAsync');
const multer = require('multer');
const User = require('../models/userModel');

exports.getSettings = (req, res, next) => {
    res.status(200).render('settings', {
        title: 'SuperFule | User Information',
    });
}
exports.getProfile = (req, res, next) => {
    res.status(200).render('profile', {
        title: 'SuperFule | User Profile',
    });
}
exports.updateUserInformation = (req, res, next) => {
    console.log(req.params.id);
    const {
        first_name,
        last_name,
        company,
        email,
        phone_number,
        street_number,
        street_name,
        city,
        state,
        zip_code,
        country } = req.body;


}