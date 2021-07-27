const db = require("../dbconfig");
const User = require('../models/userModel');

exports.findAllQuotes = () => {
    const sqlQuery = `SELECT * FROM Fuel_Quote`;
    return new Promise((resolve, reject) => {
        db.query(sqlQuery, (error, result) => {
            if (error) {
                return reject(error);
            };
            return resolve(result);
        });
    });
}

const getFactor = async (id, gallons) => {
    const user = await User.findUserById(id);
    const requestingUser = user[0];
    const historyCount = await User.findQuoteHistory(id);
    const quoteHistory = historyCount.length;

    let locationFactor = 0;
    let rateHistoryFactor = 0;
    let gallonRequestedFactor = 0;
    let companyProfitFactor = parseFloat(10 / 100).toFixed(3);
    let totalFactor = 0;

    requestingUser.state === 'TX' ? locationFactor = parseFloat(2 / 100).toFixed(3) : locationFactor = parseFloat(4 / 100).toFixed(3);
    quoteHistory >= 1 ? rateHistoryFactor = parseFloat(1 / 100).toFixed(3) : rateHistoryFactor;
    parseFloat(gallons).toFixed(3) >= 1000 ? gallonRequestedFactor = parseFloat(2 / 100).toFixed(3) : gallonRequestedFactor = parseFloat(3 / 100).toFixed(3);

    totalFactor = parseFloat(companyProfitFactor) + parseFloat(locationFactor) - parseFloat(rateHistoryFactor) + parseFloat(gallonRequestedFactor);
    return totalFactor;
}

const getMargin = async (id, gallons) => {
    const totalFactor = await getFactor(id, gallons);
    const currentPricePerGallon = 1.50;
    let totalMargin = currentPricePerGallon * totalFactor;
    return totalMargin;
}

exports.getEstimate = async (id, gallons) => {
    const totalMargin = await getMargin(id, gallons);
    const suggested_price_per_gallon = totalMargin + 1.50;
    const totalAmountDue = suggested_price_per_gallon * gallons;
    return {
        suggested_price_per_gallon: suggested_price_per_gallon,
        totalAmountDue,
    }

};

exports.submitNewQuote = async (quote) => {
    const sqlQuery = `INSERT INTO Fuel_Quote(
        ClientInformation_ID, 
        gallons,
        delivery_date,
        delivery_address,
        suggested_price,
        amount_due,
        valid_until,
        quote_status
    ) VALUES(
        ${quote.ClientInformation_ID},
        ${quote.gallons},
        '${quote.delivery_date}',
        '${quote.delivery_address}',
        ${quote.suggested_price},
        ${quote.amount_due},
        '${quote.valid_until}',
        '${quote.quote_status}'
        );`
    return new Promise((resolve, reject) => {
        db.query(sqlQuery, (error, result) => {
            if (error) {
                return reject(error);
            };
            return resolve(result);
        });
    });
};