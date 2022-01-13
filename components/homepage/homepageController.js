const homepageService = require('./homepageService');
module.exports = {
    homepage: async(req, res) => {
        const seatClass = await homepageService.seatClass();
        res.render('index', { title: 'Homepage', seatClass });
    }
}