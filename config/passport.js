const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const helper = require("../helpers/helper");

// Set up the Passport strategy:

passport.use(
    new LocalStrategy(function (username, password, done) {
        helper.findByUsername(username, async function (err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false);
            }
            const matchedPassword = await bcrypt.compare(password, user.password);

            if (!matchedPassword) {
                return done(null, false);
            }
            console.log('passaporte.use:')
            console.log(user)
            return done(null, user);
        });
    })
);
// Serialize a user
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Deserialize a user
passport.deserializeUser((id, done) => {
    helper.findById(id, function (err, user) {
        if (err) {
            return done(err);
        }

        done(null, user);
    });
});

