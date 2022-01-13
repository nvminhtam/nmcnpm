const homepageService = require('./homepageService');
module.exports = {
  homepage: async (req, res) => {
    const queryDepartAirPort = await homepageService.findDepartAirport();
    const queryArrivalAirPort = await homepageService.findArrivalAirport();
    const seatClass = await homepageService.seatClass();
    res.render('index', {
      title: 'Homepage',
      seatClass,
      arrivalAirport: [...new Set(queryDepartAirPort)][0],
      departAirport: [...new Set(queryArrivalAirPort)][0],
    });
  },
};
