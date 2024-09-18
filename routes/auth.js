var express = require('express');
const { login } = require('../controllers/authController');
var router = express.Router();



/* GET Login page. */
router.get('/', function(req, res, next) {
  if(req.session.userid)
  {
    res.redirect('/book-list');
    return;
  }
  res.render('login', { title: 'LMS' });
});

//Post method for login the user in the system
router.post('/',login);

module.exports = router;
