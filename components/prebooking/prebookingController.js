const bill = require("../../models/bill");

module.exports = {
    prebookingPage: (req, res) => {
        const { id } = req.query
        const { passengers } = req.params;
        res.render('prebooking/prebooking', { title: 'Prebooking' });
    },
    bookingDetail: (req, res) => {
        res.render('prebooking/prebookingDetail', { title: 'Prebooking' });

    },
    ticket: (req, res) => {

        const passengers = [{
            firstName: "Minh",
            lastName: "Tam",
            email: "minhtam@gmail.com"
        }]
        const flights = [{
                from: "Ho Chi Minh",
                timeFrom: "5h",
                to: "Da Nang",
                timeArrive: "6h",
                plane: "Airbus 123",
                class: "Economy"

            },
            {
                from: "Da Nang",
                timeFrom: "6h30",
                to: "Ha Noi",
                timeArrive: "7h15",
                plane: "Airbus 123",
                class: "Economy"
            },

        ]
        const bill = {
            code: "123",
            passengers: passengers,
            flights: flights,
        }

        res.render('bill/bill', { title: 'Bill', bill: bill });
    }
}