var express = require('express');
var router = express.Router();
const studentController = require('../controllers/studentListController');

const {upload} = require('../config/file_upload');


/* GET book list page. */
router.get('/',studentController.getStudentList);

// To render the add student form page
router.get('/add-student',studentController.renderAddStudentPage);

// To save the student to database
router.post('/add-student', upload.single('student_photo'), studentController.addStudent);

// To export the list of students
router.get('/export',studentController.exportStudentList);



module.exports = router;
