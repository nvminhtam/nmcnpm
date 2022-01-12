const bookingService = require('./bookingService');
var Duration = require("duration");
module.exports = {
    payment: async (req, res) => {
        res.render("payment/payment", { title: 'Payment' });
    }
}