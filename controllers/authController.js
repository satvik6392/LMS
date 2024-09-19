const db = require('../config/db');
const { User } = require('../models/user');
const bcrypt = require('bcrypt');
const passport = require('passport');

exports.googleAuth = passport.authenticate("google", {
  scope: ["email", "profile"]
});

exports.googleCallback = passport.authenticate("google", {
  successRedirect: "/auth/success",
  failureRedirect: "/"
});

exports.success = async (req, res) => {
  if (req.user) {
    req.session.username = req.user.displayName;
    req.session.userid = req.user.id;
  }
  console.log(req.user);
  res.redirect('/book-list');
};

// login controller to logged in user
exports.login = async (req, res) => {
    const { email, password } = req.body;
    const fetchUserFromDB = await User.findOne({ where: { email } });
    console.log(fetchUserFromDB);

    if (!fetchUserFromDB) {
        return res.render('error', { message: 'Invalid email or password' });
    }


    const isMatch = await bcrypt.compare(password, fetchUserFromDB.dataValues.password);
    if (!isMatch) {
        return res.render('error', { message: 'Invalid email or password' });
    }
    

    // Store user data in session
    req.session.username = fetchUserFromDB.dataValues.first_name;
    req.session.userid = fetchUserFromDB.dataValues.id;

    return res.redirect('/book-list');
};


exports.logout = async (req, res) => {
    try {
        // Destroy the session
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).render('error', { message: 'Failed to logout' });
            }
            // Redirect to the login page or home page after logout
            res.redirect('/'); // Adjust the redirection as needed
        });
    } catch (error) {
        // Handle unexpected errors
        console.error(error);
        res.status(500).render('error', { message: 'An error occurred while logging out' });
    }
};

