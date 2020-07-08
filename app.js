const express = require('express');
const app = express();
const cookieParser = require('cookie-parser')
const session = require('express-session');
const path = require('path');
//body parser
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

//set
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
//session
app.use(cookieParser())



app.use(session({
    key: 'user_sid',
    secret: "somerisetuffs",
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}));

app.use((req, res, next) => {
    console.log(req.cookies);
    console.log(req.session);


    next();

})




//eroorha
app.use(function(err, req, res, next) {
    res.status(500).send('ssa' + err)
});






const abirout = require('./router/abirouter');
app.use('/', abirout)

app.listen(8080, function() {
    console.log("it is ready:9000");
});

const mongoose = require('mongoose');


mongoose.connect(
    'mongodb://localhost:27017/Final', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
)