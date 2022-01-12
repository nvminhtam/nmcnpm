var Duration = require("duration");
module.exports = {
    payment: async (req, res) => {
        res.render("payment/payment", { title: 'Payment' ,styles: ['payment']});
    }
}