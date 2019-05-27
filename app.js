// Используемые в проекте пакеты
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const client = require('./routes/DB').client;
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const passport = require('passport');
let crypto = require('crypto');

require('./routes/passportConfig');

const auth = function(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        return res.redirect('/');
    }
};


app.listen(8080);

app.set('view engine', 'ejs');
app.use('/public', express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
    session({
        secret: 'hghtyNN23h',
        store: new FileStore(),
        cookie: {
            path: '/',
            httpOnly: true,
            maxAge: 60 * 60 * 1000,
        },
        resave: false,
        saveUninitialized: false,
    })
);
app.use(passport.initialize());
app.use(passport.session());


app.get('/',function (req, res) {
    res.render('welcome_page')
});

app.get('/all_persons',function (req, res) {
    client.query('SELECT name, email FROM persons;', [], function (err, result) {
        res.render('persons_list', {person_table: renderTable(result.rows)});
    });
});

app.get('/person_page/:userName', auth, function(req, res){
    res.render('person_page',{userName: req.params.userName})
});

app.get('/logout', function(req, res){
    req.logOut();
    return res.send('/');
});

app.post('/save_person', urlencodedParser,function (req, res) {
    client.query("INSERT INTO users(name, email, password) " +
        "values('"+req.body.name +"','" + req.body.email+"','" + crypto.createHash('md5').update(req.body.password).digest("hex")+"')");
});


app.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user) {
        let obj = {};
        if (err) {
            return next(err);
        }
        if (!user) {
            obj['error'] = true;
            obj['message'] = 'Неверный e-mail и/или пароль';
            return res.send(obj);
        }
        req.logIn(user, function(err) {
            if (err) {
                return next(err);
            }
            obj['error'] = false;
            console.log(user);
            obj['url'] = '/person_page/'+user['name'];
            return res.send(obj);
        });
    })(req, res, next);
});

function renderTable(data) {
    let result = '<table id="person_table" class="shownTables">'+
        '<thead><tr><th>Имя</th><th>E-mail</th></tr></thead>';
    data.forEach(function (i) {
        result += '<tr><td>'+i['name']+'</td><td>'+i['email']+'</td></tr>'
    });
    result += '</table>';
    return result;
}