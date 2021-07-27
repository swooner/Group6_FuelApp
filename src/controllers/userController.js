const catchAsync = require('./../utils/catchAsync');
const multer = require('multer');
const User = require('../models/userModel');

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/public/img/');
    },
    filename: (req, file, cb) => {
        const extension = file.mimetype.split('/')[1];
        cb(null, `user-${Date.now()}.${extension}`);
    },
});

const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);

    } else {
        cb(`Not An Image! Please upload only .jpg photo.`, false);
    }
};

const upload = multer({
    storage: multerStorage,
});


exports.patchUploadPhoto = upload.single('photo');



exports.patchUpdatePhotoUrl = async (req, res, next) => {
    const fileName = req.file.filename;
    const result = await User.updatePhotoUrl(req.params.id, fileName);
    if (result.affectedRows >= 0) {
        return res.status(202).json({
            ok: true,
            status: 'success',
            message: 'Successfully update your photo!',
        });
    } else {
        return res.status(400).json({
            ok: false,
            status: 'error',
            message: 'Failed to update your photo!',
        });
    };
    next();
}

exports.getSettings = (req, res, next) => {
    res.status(200).render('settings', {
        title: 'SuperFule | User Information',
    });
}
exports.getProfile = async (req, res, next) => {
    const history = await User.findQuoteHistory(res.locals.user.ID);
    if (history.length !== 0) {
        res.locals.history = history;
    };

    res.status(200).render('profile', {
        title: 'SuperFuel | User Profile',
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
exports.getChangePassword = (req, res, next) => {
    res.render(`change_password`, {
        title: `SuperFuel ! Change Your Password`,
    })
}