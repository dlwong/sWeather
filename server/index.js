const path = require('path');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const passport = require('passport');
const mongoose = require('mongoose');

app.use(express.json());

app.use(express.static(path.join(__dirname, '../client/public')));
app.listen(port , () => console.log('App listening on port ' + port));

app.use(passport.initialize());
app.use(passport.session());

app.get('/success', (req, res) => res.send("success"));
app.get('/error', (req, res) => res.send("error login"));

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
      UserDetails.findOne({
        username: username
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

app.post('/login',
  passport.authenticate('local', { failureRedirect: '/error' }),
  (req, res) => {
    res.redirect('/success');
  });
