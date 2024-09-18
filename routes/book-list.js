var express = require('express');
var router = express.Router();
const bookController = require('../controllers/bookListController');
// const {upload} = require('../app');
const {upload} = require('../config/file_upload');
const {sendEmail} = require('../config/mail_services')


/* GET book list page. */
router.get('/',bookController.getBooks);


/* To render the add-book page  */
router.get('/add-book', (req,res)=>{
    const username = req.session.username;
    const userid = req.session.userid;
    res.render('add-book',{username, userid });
});


/*
To Add a book in the database
*/
router.post('/add-book',upload.single('book_image'),bookController.addBook);


/*
* To export the book data in excel format
*/
router.get('/export-books',bookController.exportBooks,);


module.exports = router;
