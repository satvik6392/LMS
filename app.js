var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const cors = require('cors');
const multer = require('multer');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');
var bookListRouter = require('./routes/book-list');
var issueListRouter = require('./routes/issue-list');
var studentListRouter = require('./routes/student-list');

const { title } = require('process');
const { sequelize } = require('./models/connectDB');


var app = express();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// middlewares to serve static files // css
app.use(express.static(path.join(__dirname, 'public')));
// storage files
app.use('/storage/books-images', express.static(path.join(__dirname, 'storage/books-images')));

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if using HTTPS
}));

app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  next();
});



// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './storage/books-images')
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' +file.fieldname
//     cb(null,uniqueSuffix);
//   }
// })

// const upload = multer({ storage: storage });
// app.use(upload.single('book-image'));

// DB sync
sequelize.sync({ alter: true })
    .then(() => {
        console.log("Database synchronized successfully with the altered table.");
    })
    .catch((error) => {
        console.error("Error synchronizing the database:", error);
    });

    // function checkLoginStatus(req, res, next) {
    //   console.log(`control inside ensureAuthenticated function: ${req.session.userid}`);
    //   if (req.session.userid) {
    //     return res.redirect('/book-list');
    //   }
    //   return next();
    // }
    
    function checkLoginStatus(req, res, next) {
      console.log(`control inside checkLoginStatus function : ${req.session.userid}`);
      if (req.session.userid) {
        return next();
      }
      return res.redirect('/');
    }
    
  

app.use('/', authRouter); // Ensure users are redirected to /book-list if logged in
app.use('/book-list',checkLoginStatus, bookListRouter); // Ensure users are authenticated to access /book-list   
app.use('/users',checkLoginStatus, usersRouter);
app.use('/issue-list',checkLoginStatus,issueListRouter);
app.use('/student-list',checkLoginStatus,studentListRouter);
// app.use('/auth',authRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});



// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

connectDB();

module.exports = app;
