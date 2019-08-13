const path = require('path');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const passport = require('passport');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

app.use(express.json());

app.use(express.static(path.join(__dirname, '../client/public')));
app.listen(port , () => console.log('App listening on port ' + port));

app.use(passport.initialize());
app.use(passport.session());

app.get('/success', (req, res) => res.send("success"));
app.get('/error', (req, res) => res.send("error login"));

passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser((id, cb) => {
  User.findById(id, (err, user) => {
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
      }, (err, user) => {
        if (err) {
          return done(err);
        }
        //check if user exists
        if (!user) {
          return done(null, false);
        }
        //password comparisons
        bcrypt.compare(password, user.password, (err, isValid) => {
          if (err) {
            return done(err)
          }
          if (!isValid) {
            return done(null, false)
          }
        //passes everything
          return done(null, user)
        })
      });
  }
));

app.post('/login',
  passport.authenticate('local', { failureRedirect: '/error' }),
  (req, res) => {
    res.redirect('/success');
  });

app.post('/register', (req, res, next) => {
  const {username, password} = req.body;
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);
    bcrypt.hash(password, salt, (err, hash) => {
      if (err) return next(err);
      password = hash; 
      // Store the user to the database, then send the response
      UserDetails.save({
        username: username, password: password
      });
    });
  });
  res.status(200);
});