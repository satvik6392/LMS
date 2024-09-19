var express = require('express');
const authController = require('../controllers/authController');
var router = express.Router();

const passport = require('passport');
require('../config/passport');

router.use(passport.initialize());
router.use(passport.session());



/* GET Login page. */
router.get('/', function(req, res, next) {
  if(req.session.userid)
  {
    res.redirect('/book-list');
    return;
  }
  res.render('login', { title: 'LMS' });
});

router.get("/auth/google", authController.googleAuth);
router.get("/auth/google/callback", authController.googleCallback);
router.get("/auth/success", authController.success);


router.post('/',authController.login);

module.exports = router;
