const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const passport = require('passport');
const mongoose = require('mongoose');

//app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, '../client/public')));
app.listen(port , () => console.log('App listening on port ' + port));

app.use(passport.initialize());
app.use(passport.session());

app.get('/success', (req, res) => res.send("Welcome "+req.query.username+"!!"));
app.get('/error', (req, res) => res.send("error logging in"));

passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  User.findById(id, function(err, user) {
    cb(err, user);
  });
});

mongoose.connect('mongodb://localhost/MyDatabase', { useNewUrlParser: true });

const Schema = mongoose.Schema;

const UserDetail = new Schema({
      username: String,
      password: String
    });
    
const UserDetails = mongoose.model('userInfo', UserDetail, 'userInfo');

const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  function(username, password, done) {
      UserDetails.find({
        username
      }, function(err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false);
        }
        if (user.password !== password) {
          return done(null, false);
        }
        return done(null, user);
      });
  }
));

// app.post('/login',
//   passport.authenticate('local', { failureRedirect: '/error' }),
//   function(req, res) {
//     res.redirect('/success');
//   });

app.post('/login', (req, res) => {
  const {username, password} = req.body;
      passport.authenticate('local', 
        { successRedirect: '/success',
        failureRedirect: '/error' })
});

// app.post('/login', (req, res) => {
//   const {username, password} = req.body;
//   UserDetails.find({username
//   }, (err, doc) => {
//     if (err) {res.send(err)}
//     res.send(doc)
//   })
// });