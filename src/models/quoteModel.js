class Quote {
    constructor(id, gallons, date_delivery, suggested_price, amount_due) {
        this.id = id;
        this.gallons = gallons;
        this.date_delivery = date_delivery;
        this.suggested_price = suggested_price;
        this.amount_due = amount_due;
    }
};

let nextId = 0;
exports.addQuote = ({ gallons, date_delivery, suggested_price, amount_due }) => {
    const quote = new Quote(
        `${nextId++}`,
        gallons,
        date_delivery,
        suggested_price,
        amount_due
    );
    return quote;
};