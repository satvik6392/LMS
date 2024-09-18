const db = require('../config/db');
const { User } = require('../models/user');
const bcrypt = require('bcrypt');


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


