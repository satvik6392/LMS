// controllers/bookController.js
const Book = require('../models/book');
const {User} = require('../models/user');
const ExcelJS = require('exceljs');


/* To get the list of student to show on student list page */
exports.getStudentList = async (req, res) => {
    try {
        
        const username = req.session.username;
        const userid = req.session.userid;
        const students = await User.findAll({
            where: {
                role: 'student'
            }
        });

        // Pass username, and userid to the template
        res.render('student-list', { username, userid, students });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.render('error', { message: 'Unable to fetch students' });
    }
};


/* To render the add-student form Page */
exports.renderAddStudentPage = (req,res)=>{
    try {
        
        const username = req.session.username;
        const userid = req.session.userid;

        // Pass username, and userid to the template
        res.render('add-student', { username, userid });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.render('error', { message: 'Unable to fetch books' });
    }
}

/* To export the student list in excel sheet */
exports.exportStudentList = async (req, res) => {
    try {
        // Fetch data from the database for students with the role 'student'
        const students = await User.findAll({
            where: {
                role: 'student'
            }
        });

        // Create a new Excel workbook and worksheet
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Students');

        // Define columns for the worksheet
        worksheet.columns = [
            { header: 'First Name', key: 'first_name', width: 30 },
            { header: 'Middle Name', key: 'middle_name', width: 30 },
            { header: 'Last Name', key: 'last_name', width: 30 },
            { header: 'Email', key: 'email', width: 30 },
            { header: 'Phone No', key: 'phone_no', width: 20 },
            { header: 'Roll No', key: 'roll_no', width: 20 }
        ];

        // Add rows to the worksheet based on the fetched student data
        students.forEach(student => {
            worksheet.addRow({
                first_name: student.first_name,
                middle_name: student.middle_name || '', // If middle name is null, show an empty string
                last_name: student.last_name,
                email: student.email,
                phone_no: student.phone_no || 'N/A', // If phone number is not available, show 'N/A'
                roll_no: student.roll_no || 'N/A' // If roll number is not available, show 'N/A'
            });
        });

        // Set response headers to indicate a file attachment
        res.setHeader('Content-Disposition', 'attachment; filename=students.xlsx');
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

        // Write the workbook to the response
        await workbook.xlsx.write(res);
        res.end();
    } catch (error) {
        console.error('Error exporting student list:', error);
        res.status(500).send('Error exporting student list');
    }
};


/* To add a student in the database */
exports.addStudent = async (req, res) => {
    console.log("calling add student controller");
    console.log("Request body:", req.body);
    console.log("Uploaded file:", req.file);

    const { first_name, last_name, middle_name, username, email, roll_no, phone_no } = req.body;
    
    // Validate required fields
    if (!first_name || !last_name || !username || !email) {
        return res.status(400).render('error', { message: 'Required fields are missing' });
    }

    // Get the uploaded file path
    const filePath = req.file ? req.file.path : null;

    try {
        // Create a new student record
        const newStudent = await User.create({
            first_name,
            last_name,
            middle_name,
            username,
            email,
            password: '123456', // Default password
            role: 'student',    // Default role
            roll_no,
            phone_no,
            file: filePath
        });

        // Redirect or send a response after successfully adding a student
        res.redirect('/student-list');
    } catch (error) {
        console.error("Error creating student:", error);
        res.status(500).render('error', { message: 'An error occurred while adding the student' });
    }
};
