module.exports = {
    prebookingPage: (req, res) => {
        const { idFlight } = req.query
        res.render('prebooking/prebooking', { title: 'Prebooking' });
    },
    bookingDetail: (req, res) => {
        res.render('prebooking/prebookingDetail', { title: 'Prebooking' });
    }
}