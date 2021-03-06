var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var hbs = require('hbs');
const session = require('express-session');
const passport = require('./components/auth/passport');


// router
const homepageRouter = require('./components/homepage');
const prebookingRouter = require('./components/prebooking');
const bookingRouter = require('./components/booking');
const paymentRouter = require('./components/payment')
const flightRouter = require('./components/flight');
var billRouter = require('./components/bill');
const authRouter = require('./components/auth');
// helpers
const helpers = require('./hbsHelpers');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

hbs.registerPartials(__dirname + '/views/partials', (err) => {});
// load helpers
helpers.helpers(hbs);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'nmcnpm' }));
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});

// use routes
app.use('/auth', authRouter);
app.use('/', homepageRouter);
app.use('/flight', flightRouter);
app.use('/prebooking', prebookingRouter);
app.use('/booking', bookingRouter);
app.use('/payment', paymentRouter);
app.use('/bill', billRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;