const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const randomstring = require('randomstring');
const config = require('../config/database');
var nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');

// Register
router.post('/register', (req, res, next) => {
  // here we generate secret token
  const secretToken = randomstring.generate();
  let newUser = new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    distanceFromGrid: req.body.distanceFromGrid,
    balanceAmount: req.body.balanceAmount,
    PricePerKWH: req.body.PricePerKWH,
    productionCapacity:req.body.productionCapacity,
    LocationDetail:req.body.LocationDetail,
    Lattitude:req.body.Lattitude,
    Longitude:req.body.Longitude,
    secretToken:secretToken,
    activate:false,
    createdAt:new Date()
  });

  User.addUser(newUser, (err, user) => {

    if(err){
      res.json({success: false});
    } else {
      const output = `
<p>Registration Detail</p>
  Hi ${user.username},<br/> Thank you for registering! <br/><br/> Please verify your email by typing the following token On the following page:<a href="http://localhost:3000/verify/${secretToken}">http://localhost:3000/users/verify</a>  <br/><br/>  your token is.'+${secretToken}
`;

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
host: 'smtp.mailtrap.io',
port: 2525,
secure: false, // true for 465, false for other ports
auth: {
   user: '91721443e36de1', // generated ethereal user
   pass: '9f07fac0f20063'  // generated ethereal password
},
tls:{
 rejectUnauthorized:false
}
});

// setup email data with unicode symbols
let mailOptions = {
 from: '"test@testing.io', // sender address
 to: 'test@testing.io', // list of receivers
 subject: 'Regisration Detail', // Subject line
 text: 'Hello world?', // plain text body
 html: output // html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, (error, info) => {
if (error) {
   return console.log(error);
}
console.log('Message sent: %s', info.messageId);
console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

});
      res.json({success: true, message:'User registered'});
    }
  });


});

// Authenticate
router.post('/authenticate', (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;


  User.getUserByEmail(email, (err, user) => {


    if(err) throw err;
    if(!user){

      return res.json({success: false, msg: 'User not found'});
    }



    User.comparePassword(password, user.password, (err, isMatch) => {
      if(err) throw err;

      if(isMatch){

         if(user.activate == false){
           return res.json({success:'notActivate',message:'Not Activate'});
         }
        const token = jwt.sign({data: user}, config.secret, {
          expiresIn: 604800 // 1 week
        });
        user = JSON.parse(JSON.stringify(user));
        res.json({
          success: true,
          token: 'JWT '+token,
          user: {
            id: user._id,
            username: user.username,
            email: user.email,
            isAdmin: user.isAdmin
          }
        });

      } else {
        return res.json({success: false, msg: 'Wrong password'});
      }
    });
  });
});


// Reset Password
// Reset Password
router.post('/resetPassword/:token/:password', (req, res) => {

  User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, (err,user) => {

    if (!user) {
       res.json({success:false});
    }


    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(req.params.password, salt, (err, hash) => {
        if(err) return err;
        user.password = hash;
        user.resetPasswordToken = '';
        user.resetPasswordExpires = '';
        user.save();
      });
    });

    res.json({success:true});

 });
});


router.post('/forgetPassword', (req, res) => {
  const email = req.body.email;
  User.getUserByEmail(email, (err, user) => {

   if(err) throw err;
   if(!user){

     return res.json({success: false, message: 'User not found'});
   }else{

    const resetPasswordToken  = randomstring.generate();
    user.resetPasswordToken = resetPasswordToken;
    user.resetPasswordExpires = Date.now() + 3600000;  // 1 hour
    user.save();
    const output = `
    <p>Forget Password Detail</p>
      Hi ${user.username},<br/> Please verify your email by typing the following token On the following page:<a href="http://localhost:3000/reset/${resetPasswordToken}">Password Reset</a>  <br/><br/>
    `;

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    secure: false, // true for 465, false for other ports
    auth: {
       user: '91721443e36de1', // generated ethereal user
       pass: '9f07fac0f20063'  // generated ethereal password
    },
    tls:{
     rejectUnauthorized:false
    }
    });

    // setup email data with unicode symbols
    let mailOptions = {
     from: '"passwordreset@demo.com', // sender address
     to: 'test@testing.io', // list of receivers
     subject: 'Password Reset', // Subject line
     text: 'Hello world?', // plain text body
     html: output // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
       return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    });

    res.json({success:true,message:'An Email has been send to your account'});
   }

 });
});

/* ============================================================
    Route to check if user's email is available for registration
 ============================================================ */
 router.get('/checkEmail/:email', (req, res) => {
   // Check if email was provided in paramaters
   if (!req.params.email) {
     res.json({ success: false, message: 'E-mail was not provided' }); // Return error
   } else {
     // Search for user's e-mail in database;
     User.findOne({ email: req.params.email }, (err, user) => {
       if (err) {
         res.json({ success: false, message: err }); // Return connection error
       } else {
         // Check if user's e-mail is taken
         if (user) {
           res.json({ success: false, message: 'E-mail is already taken' }); // Return as taken e-mail
         } else {
           res.json({ success: true, message: 'E-mail is available' }); // Return as available e-mail
         }
       }
     });
   }
 });





 router.get('/getAllUsers', (req, res) => {
     User.find((err, users) => {
       if (err) {
         res.json({ success: false, message: err }); // Return connection error
       } else {
         res.json({ success: true, users: users});
       }
     });

});


/* ============================================================
    Route to getUserById
 ============================================================ */
 router.get('/getUserById/:id', (req, res) => {

    // Search userById  in database;
    User.getUserById({ _id: req.params.id }, (err, user) => {
      if (err) {
        res.json({ success: false, message: err }); // Return connection error
      } else {
        if (user) {
          res.json({ success: true, message: user}); // Return as user
        } else {
          res.json({ success: false, message: 'No user found' }); // Return as no user available
        }
      }
    });

  });


/* ============================================================
    Route to activateUser account 
 ============================================================ */
 router.get('/activateUser/:id', (req, res) => {

  // Search userById  in database;
  User.getUserById({ _id: req.params.id }, (err, user) => {
    if (err) {
      res.json({ success: false, message: err }); // Return connection error
    } else {
      if (user) {
        console.log(user);
        user.activate = true;
        user.save();
        res.json({ success: true, message: user}); // Return as user
      } else {
        res.json({ success: false, message: 'No user found' }); // Return as no user available
      }
    }
  });

});



/* ============================================================
    Route to verify forget password token
 ============================================================ */
 router.get('/verify/:token', (req, res) => {
  // Check if token was provided in paramaters
  if (!req.params.token) {
    res.json({ success: false, message: 'No token is provided' }); // Return error
  } else {
    // Search for user's token in database;
    User.getUserByToken( req.params.token, (err, user) => {
      if (err) {
        res.json({ success: false, message: 'Invalid token' }); // Return connection error
      } else {

        if (user) {
          user.active = true;
          user.secretToken = '';
          user.updatedAt  = new Date();
          user.activate = true;
          user.save();
          res.json({ success: true, message: 'User is activated sucessfully now you can login ' }); // Return as taken e-mail
        }
      }
    });
  }
});


// Profile
router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  // res.send("authenticated successfully");
  res.json({user: req.user});
});



module.exports = router;
