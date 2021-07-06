exports.getIndex = (req, res, next) => {
    res.status(200).render(`index`, {
        title: `Super Fuel | Premium Fuel Delivered in a Click`
    });
}