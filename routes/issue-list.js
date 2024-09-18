var express = require('express');
var router = express.Router();
const issueController = require('../controllers/issueListcontroller');


/* GET book list page. */
router.get('/',issueController.getIssueList);

/* To Render book issue form page*/
router.get('/issue-book',issueController.renderIssueBookPage);

/** To Issue a book to student */
router.post('/issue-book',issueController.issueBookToStudent);


/* To export the data in excel format */
router.get('/export',issueController.exportBookIssueSheet);


/* To return a book - it updates the date of return in database */
router.post('/return-book', issueController.returnBook);


module.exports = router;
