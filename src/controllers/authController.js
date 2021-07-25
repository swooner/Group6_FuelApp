const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const catchAsync = require('./../utils/catchAsync');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const { body, validationResult } = require('express-validator');

const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
};

const createSendToken = async (user, statusCode, res) => {
    const token = signToken(user.ID);
    res.cookie('jwt', token).status(statusCode).json({
        ok: true,
        status: 'success',
        message: 'You have been successfully authorized! Signing you in!',
        token,
        data: {
            user
        }
    });

};
// Sign up user 
exports.signUp = [
    body('email').trim().not().isEmpty().withMessage('Email cannot be Empty').isEmail().withMessage('Email is not valid').custom(email => {
        return User.findUser(email).then(user => {
            if (user[0]) {
                return Promise.reject(`This E-mail is not available!`);
            };
        })
    }),
    body('password').trim().not().isEmpty().withMessage('Password cannot be Empty').isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
    }).withMessage('Password is not strong enough'),
    body('confirm_password').custom((confirmPassword, { req }) => {
        if (confirmPassword !== req.body.password) {
            throw new Error('Password confirmation does not match password');
        };
        return true;
    }),
    async (req, res, next) => {
        const errors = validationResult(req);
        console.log(req.body);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                ok: false,
                errors: errors.array(),
                message: 'Error while trying to create your account! Please try again.'
            });
        } else {
            const result = await User.createCredential(req.body.email, req.body.password);
            if (result.insertId) {
                return res.status(201).json({
                    ok: true,
                    status: 'success',
                    message: 'You have been successfully registered! Please sign-in to begin using your account.'
                })
            } else {
                return res.status(400).json({
                    ok: false,
                    status: 'failed',
                    errors: errors.array(),
                    message: 'Error while trying to create your account! Please try again.'
                })
            }
        }
    }
];
// Sign in users
exports.signIn = catchAsync(async (req, res, next) => {
    //pull out email and password from request body
    const { email, password } = req.body;
    //if submit without email and/ or password => return with error;
    if (!email || !password) {
        return res.status(400).json({
            ok: false,
            status: `error`,
            message: 'Please provide your Email and Password to sign-in',
        });
    };
    //check if user exist && password is correct
    const user = await User.findUser(email);
    if (user.length === 0 || user === null || user === undefined) {
        return res.status(401).json({
            ok: false,
            status: `error`,
            message: 'There is no Email and/ or Password that match your credential',
        });
    } else {
        const isMatch = await bcrypt.compare(password, user[0].password);
        if (isMatch) {
            console.log(user[0]);

            res.locals.user = user[0];
            data = {
                role: user[0].role_name,
            };
            createSendToken(user[0], 200, res);
        } else {
            return res.status(401).json({
                ok: false,
                status: `error`,
                message: 'There is no Email and/ or Password that match your credential',
            });
        }
    }
});

//sign out user
exports.signOut = (req, res) => {
    res.cookie('jwt', 'loggedout', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true
    });
    res.status(200).json({ status: 'success' });
};


// only signed in user can use these routes
exports.protect = catchAsync(async (req, res, next) => {
    // 1) Getting token and check of it's there
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.jwt) {
        token = req.cookies.jwt;

    }
    if (!token) {
        res.status(401).render(`error`, {
            title: 'SuperFuel | Unauthorized Access',
            status: 'failed',
            statusCode: 401,
            message: 'Please sign-in to continue.',
        });
    }
    // 2) Verification token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    const currentUser = await User.findUserById(decoded.id);
    if (currentUser[0] === '' || currentUser[0] === null || currentUser[0] === undefined) {
        res.status(401).render(`error`, {
            title: 'User does not exist',
            status: 'failed',
            statusCode: 401,
            message: 'This user no longer exist!',
        });
    }

    // GRANT ACCESS TO PROTECTED ROUTE
    req.user = currentUser;
    res.locals.user = currentUser[0];
    next();
});