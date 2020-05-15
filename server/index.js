const path = require('path');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
// passport is a modular authentication middlware
const passport = require('passport'); 
const mongoose = require('mongoose');
// Bcrypt is a member of a new family of hashing functions that are designed to withstand modern approaches to password cracking. 
// It is designed to be computationally expensive to compute and it has a configurable work factor that can be used to increase 
// the expense to help keep pace with the relentless growth in computing power.
const bcrypt = require('bcrypt');
const api = require('../helper/weather_api.js');

app.use(express.json());

app.use(express.static(path.join(__dirname, '../client/public')));
app.listen(port , () => console.log('App listening on port ' + port));

app.use(passport.initialize());
app.use(passport.session());

app.get('/success', (req, res) => res.send("success"));
app.get('/error', (req, res) => res.send("error login"));

// to use passport with any strategy, must configuring passport on how to store users and retrieve them from the session
// users id to store
passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

// fetch the user given the id
passport.deserializeUser((id, cb) => {
  User.findById(id, (err, user) => {
    cb(err, user);
  });
});

mongoose.connect('mongodb://localhost/MyDatabase', { useNewUrlParser: true });
mongoose.set('useCreateIndex', true);

const Schema = mongoose.Schema;

// unique so they don't create multiple accounts
const UserDetail = new Schema({
      username: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true
      }
    });

const UserDetails = mongoose.model('userInfo', UserDetail, 'userInfo');

// only need to authenticate users stored in our db so use local-strategy
const LocalStrategy = require('passport-local').Strategy; 

passport.use(new LocalStrategy(
  function(username, password, done) {
      UserDetails.findOne({
        username: username
      }, (err, user) => {
        if (err) {
          return done(err);
        }
        // check if user exists
        if (!user) {
          return done(null, false);
        }
        // password comparison
        bcrypt.compare(password, user.password, (err, isValid) => {
          if (err) {
            return done(err)
          }
          if (!isValid) {
            return done(null, false)
          }
        // passes everything
          return done(null, user)
        })
      });
  }
));

app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/success",
    failureRedirect: "/error",
    failureFlash: true
  })
);


app.post('/register', (req, res, next) => {
  let newUser = new UserDetails({
    username: req.body.username,
    password: req.body.password
  });
  // salt to fight rainbow table attacks and brute force if someone gains access to the db
  // salt_work_factor is default 10, but we are being explicit here
  // generate a salt
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    // hash the password using our new salt
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      // console.log('before', newUser.password)
      // override the cleartext password with the hashed one
      newUser.password = hash; 
      // console.log('after', newUser.password)
      // store the user to the database, then send the response
      newUser.save(function (err) {
        if (err) {
          res.status(200).send('account exists already'); 
          return console.log(err);
        };
      });
    });
  });
  res.status(200).send('success');
});

app.get('/recs', (req, res) => {
  api.getWind((err, value) => {
      console.log('Wind Speed: ',value);
      res.send({'value': value})
  })
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/../client/public/index.html'));
});