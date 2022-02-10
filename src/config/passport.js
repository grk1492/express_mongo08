// Passport module 
// ===========================================

const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

module.exports = (passport) => {
    passport.use(new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'mdp'
        },
        function (email, mdp, done) {
            //Recherche du User
            User.findOne({email: email})
                .then(user => {
                        //User non trouvé
                        if (!user) {
                            return done(null, false, {message: `Aucun user n'utilise l'email "${email}"`});
                        }

                        //User trouvé
                        validPassword(user, mdp, done);
                    }
                )
                .catch(err => {
                        console.log(err);
                    }
                )
        })
    );

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });
}

/*FONCTION ASYNCHRONE DE VALIDATION DE MOT DE PASSE*/
const validPassword = async (user, mdp, done) => {
    await bcrypt.compare(mdp, user.mdp)
        .then(isMatch => {
                if (!isMatch) {
                    //Le mot de passe ne correspond pas
                    return done(null, false, {message: 'Mot de passe incorrecte.'});
                } else {
                    //Le mot de passe correspond
                    return done(null, user);
                }
            }
        )
        .catch(err => {
                return done(err);
            }
        );
}

