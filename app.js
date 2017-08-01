/**
 * Created by winter on 6/29/2017.
 */

const express        = require("express"),
      app            = express(),
      bodyParser     = require("body-parser"),
      mongoose       = require("mongoose"),
      flash          = require('connect-flash'),
      passport       = require('passport'),
      LocalStrategy  = require('passport-local'),
      // LocalStrategy  = require('passport-local').Strategy,
      methodOverride = require('method-override'),
      customer       = require('./models/customer'),
      fs             = require('fs'),
      seedDB         = require('./seeds');

const indexRoutes    = require('./routes/index'),
      ajaxRoutes     = require('./routes/ajax');

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/cleaning_test", {useMongoClient: true});
// mongoose.connect("mongodb://admin:123@ds133922.mlab.com:33922/winter_cleaning_test", {useMongoClient: true});
// mongoose.connect("mongodb://<user>:<pass>@ds133922.mlab.com:33922/winter_cleaning_test", {useMongoClient: true});
// mongoose.connect(process.env.DATABASEURL);
mongoose.connection.once('open', () => console.log('Mongo connection successful.'))
    .on('error', (error) => console.log('Mongo connection error:', error));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(flash());

app.use(require('express-session')({
    secret: 'winterSecret',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(customer.authenticate()));
passport.serializeUser(customer.serializeUser());
passport.deserializeUser(customer.deserializeUser());

app.use((req, res, next) => {
    const now = new Date().toString();
    const log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('UNABLE TO APPEND TO SERVER.LOG.')
        }
    });
    //res.locals is what all the templates can access
    //req.user is user information that comes from passport
    // res.locals.currentUser = req.user;
    // res.locals.error = req.flash('error');
    // res.locals.success = req.flash('success');
    next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + "/public"));
app.use(indexRoutes);
app.use(ajaxRoutes);

seedDB();

app.listen(process.env.PORT || 3000, process.env.IP, () =>
    console.log("Server listening..."));