var flash = require('connect-flash');
var passport = require('passport');
var LocalStrategy   = require('passport-local').Strategy;
var User = require('../models/user');
var bCrypt = require('bcrypt-nodejs');

module.exports = function(passport){

  passport.use('signup', new LocalStrategy({
            passReqToCallback : true 
        },
        function(req, username, password, done) {

            findOrCreateUser = function(){
                User.findOne({ 'username' :  username }, function(err, user) {
                    if (err){
                        console.log('Erreur inscription: '+err);
                        return done(err);
                    }
                    if (user) {
                        console.log('Ce nom est dejà pris: '+username);
                        return done(null, false, req.session.messages = ['Ce nom existe déjà']);
                    } else {
                        var newUser = new User();
                        newUser.username = username;
                        newUser.password = createHash(password);
                        newUser.mail = req.param('mail');
                        newUser.firstName = req.param('firstName');
                        newUser.surname = req.param('surname');
                        newUser.additional = req.param('additional');

                        newUser.save(function(err) {
                            if (err){
                                console.log('Erreur enregistrement: '+err);  
                                throw err;  
                            }
                            console.log('Inscription réussie');    
                            return done(null, newUser);
                        });
                    }
                });
            };
            process.nextTick(findOrCreateUser);
        })
    );

    var createHash = function(password){
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    }

}
