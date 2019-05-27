const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
let crypto = require('crypto');
const client = require('./DB').client;

passport.use(new LocalStrategy({
        usernameField: 'email'
    },function(name, password, done) {
        let hashPassword = crypto.createHash('md5').update(password).digest("hex")
        client.query("SELECT id, name, email FROM persons " +
            "WHERE email=$1 AND password=$2", [name, hashPassword])
            .then(function(person){
                if (person.rows.length === 0){
                    throw error();
                }
                return done(null, person.rows[0]);
            })
            .catch(function(err) {
                console.log("/login: " + err);
                return done(null, false, {message:'Неверный e-mail и/или пароль'});
            });
    }));


passport.serializeUser(function(person, done){
    done(null, person['id']);
});

passport.deserializeUser(function(id, done){
    client.query("SELECT id, name, email FROM persons " + "WHERE id = " + id,[])
        .then(function(user){
            done(null, user);
        })
        .catch(function(err){
            done(new Error('Пользователя с id ${parseInt(id)} нет в БД'));
        })
});