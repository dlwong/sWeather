const path = require('path');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const credentials = require('../credentials');

// passport is a modular authentication middlware
const passport = require('passport'); 
const mongoose = require('mongoose');

// Bcrypt is a member of a new family of hashing functions that are designed to withstand modern approaches to password cracking. 
// It is designed to be computationally expensive to compute and it has a configurable work factor that can be used to increase 
// the expense to help keep pace with the relentless growth in computing power.
const bcrypt = require('bcrypt');
// const api = require('../helper/weather_api.js');
const crypto = require('crypto');
const nodemailer = require('nodemailer');


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
        required: false,
        unique: false,
      },
      password: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: false,
        unique: false
      },
      resetPasswordToken: {
        type: String,
        default: ''
      },
      resetPasswordExpires: {
        type: Date,
        default: '2020-05-15'
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
    password: req.body.password,
    email: req.body.email
  });

  // salt is an extra input to hash. it's to fight rainbow table attacks and brute force if someone gains access to the db
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

      // override the cleartext password with the hashed one
      newUser.password = hash; 

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

app.post('/forgotpassword', (req, res) => {
  const { email } = req.body;

  if (email === ''){
    res.status(400).send('email required')
  }
  UserDetails.findOne({
    email: email}, (err, user) => {
      if (err){
        res.status(403).send(err);
        return console.error('Email does not exist in db')
      }

      // generate a unique hash
      const token = crypto.randomBytes(20).toString('hex')
      user.resetPasswordToken = token;

      // 1 hour token is valid
      user.resetPasswordExpires = Date.now() + 3600000;

      // update token in db
      user.save(err => {
        if (err){
          res.status(403).send(err);
          return console.error('Error updating in db');
        }
        res.status(200).send('Successful Update');
      })

      // generate test account
      // let testAccount = nodemailer.createTestAccount();
      
      // account sending the reset password email
      let transporter = nodemailer.createTransport({
        // host: "smtp.ethereal.email",
        // port: 587,
        // secure: false,
        // auth: {
        //   user: testAccount.user,
        //   pass: testAccount.pass,
        // },
        service: 'gmail',
        auth: {
          user: `${credentials.EMAIL_ADDRESS}`,
          pass: `${credentials.EMAIL_PASSWORD}`
        },
      });

      const mailOptions = {
        from: 'no-reply@example.com',
        to: 'pingki@sbcglobal.net',
        // to: `${user.email}`,
        subject: 'Link to Reset Password',
        // text: `http://localhost:3000/reset/${token}`
      };

      console.log('sending email')

      //send the email
      transporter.sendMail(mailOptions, (err, res) => {
        if (err){
          console.error('there was an error sending email', err)
        }else {
          console.log('here is the response:', response);
          res.status(200).json('recovery email sent');
        }
      });
  })
})

app.get('/resetpassword', (req, res) => {
  // console.error(req.query.resetPasswordToken)
  UserDetails.findOne({
    resetPasswordToken: req.query.resetPasswordToken,

    // Time limit honoured for the token
    // resetPasswordExpires: {
    //   $lte: Date.now()
    // },
  }, (err, user) => {
    if (err){
      console.error(err)
    }else{
      res.status(200).send({
        username: user.username,
        message: 'password link is fine'
      })
    }
  })
})

app.put('/updatePassword', (req, res) => {
  UserDetails.findOne({
    username: req.body.username
  }, (err, user) => {
      if (err){
        console.error('Error finding user in db')
      }else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return next(err);
          }
          user.password = hash; 
          user.save(function (err) {
            if (err) {
              res.status(200).send('Could not save new password'); 
              return console.log(err);
            };
          });
        });
      }
  })
  res.status(200).send('Successfully saved new password');
})


app.get('/recs', (req, res) => {
  res.send({'value': 3})
  // api.getWind((err, value) => {
  //     console.log('Wind Speed: ',value);
  //     res.send({'value': value})
  // })
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/../client/public/index.html'));
});