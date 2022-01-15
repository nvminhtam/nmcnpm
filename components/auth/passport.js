const passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

const {models} = require('../../models');
const bcrypt = require('bcrypt');

passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    },
    async function(username, password, done) {
        try {
            const user = await models.customer.findOne({ where: {username: username}, raw: true });
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            const match = await validPassword(user, password);
            if (!match) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
        } catch(err) {
            return done(err);
        }
    }
));


passport.serializeUser(function(user, done) {
    done(null, {userID: user.id, username: user.username});
});
  
passport.deserializeUser(function(user, done) {
    return done(null, user);
});

function validPassword(user, password){
    return bcrypt.compare(password, user.password);
}

module.exports = passport;