// controllers/bookController.js
const {Book} = require('../models/book');
const {User} = require('../models/user');
const {BookIssueStudentMapping} = require('../models/bookIssueStudentMapping');
const {sequelize} = require('../models/connectDB');
const ExcelJS = require('exceljs');


/* To get the book-issue-to-student mapping data */
exports.getIssueList = async (req, res) => {
    try {
        
        const username = req.session.username;
        const userid = req.session.userid;
        const books = await Book.findAll();

        // Fetch all users where role is 'student'
        const students = await User.findAll({
            where: {
                role: 'student'
            }
        });
        
        const issues = await BookIssueStudentMapping.findAll({
            attributes: ['id', 'book_id', 'student_id', 'issue_date', 'return_date'],
            include: [
                {
                    model: Book,
                    attributes: ['book_name', 'author_name', 'isbn']
                },
                {
                    model: User,
                    attributes: ['first_name', 'last_name']
                }
            ],
        });
        
        
        console.log(issues);
        

        // Pass username, and userid to the template
        res.render('issue-list', { username, userid, issues,students,books });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.render('error', { message: 'Unable to fetch books' });
    }
};


/* controller to render the form page of issue book to a student where we need to load book list and student list in a dropdown */
exports.renderIssueBookPage = async (req, res) => {
    const username = req.session.username;
    const userid = req.session.userid;

    try {
        // Fetch all books
        const books = await Book.findAll();

        // Fetch all users where role is 'student'
        const students = await User.findAll({
            where: {
                role: 'student'
            }
        });

        // Pass username, userid, books, and students to the template
        res.render('issue-book', { username, userid, books, students });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Internal Server Error');
    }
};


/* To issue a book to student -- adding mapping in database */
exports.issueBookToStudent = async (req, res) => {
    console.log("control inside issue book to student controller.");
    
    try {
        const { book_id, student_id } = req.body;
        
        // Check if the book exists and is available (you can customize this logic as per your needs)
        const book = await Book.findOne({ where: { id: book_id } });
        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }

        // Optional: You can check here if the book is already issued and handle that case.
        
        // Issue book by creating an entry in the mapping table
        const issueRecord = await BookIssueStudentMapping.create({
            book_id,
            student_id,
            issue_date: new Date(),
            return_date: null
        });

        // Redirect to the issue-book page or any other page
        res.redirect('/issue-list'); 

    } catch (error) {
        console.error("Error issuing the book:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

/* Exporting the excel sheet of book issue data */
exports.exportBookIssueSheet = async (req, res) => {
    try {
        // Fetch data from the database for book issue mappings
        const issues = await BookIssueStudentMapping.findAll({
            attributes: ['issue_date', 'return_date'],
            include: [
                {
                    model: Book,
                    attributes: ['book_name', 'author_name', 'isbn']
                },
                {
                    model: User,
                    attributes: ['first_name', 'last_name']
                }
            ],
        });

        // Create a new Excel workbook and worksheet
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Book Issues');

        // Define columns for the worksheet
        worksheet.columns = [
            { header: 'Student Name', key: 'student_name', width: 30 },
            { header: 'Book Name', key: 'book_name', width: 30 },
            { header: 'Author Name', key: 'author_name', width: 30 },
            { header: 'ISBN', key: 'isbn', width: 15 },
            { header: 'Issue Date', key: 'issue_date', width: 20 },
            { header: 'Return Date', key: 'return_date', width: 20 }
        ];

        // Add rows to the worksheet based on the fetched data
        issues.forEach(issue => {
            worksheet.addRow({
                student_name: `${issue.User.first_name} ${issue.User.last_name}`,
                book_name: issue.Book.book_name,
                author_name: issue.Book.author_name,
                isbn: issue.Book.isbn,
                issue_date: issue.issue_date ? issue.issue_date.toISOString().split('T')[0] : 'N/A',
                return_date: issue.return_date ? issue.return_date.toISOString().split('T')[0] : 'N/A'
            });
        });

        // Set response headers to indicate a file attachment
        res.setHeader('Content-Disposition', 'attachment; filename=book_issues.xlsx');
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

        // Write the workbook to the response
        await workbook.xlsx.write(res);
        res.end();
    } catch (error) {
        console.error('Error exporting book issues:', error);
        res.status(500).send('Error exporting book issues');
    }
};

/* To update the return date of a book in database */
exports.returnBook = async (req, res) => {
    const { issueId } = req.body;
    console.log(`issueId : ${issueId}`);
    

    try {
        // Find the book issue record by ID
        const issue = await BookIssueStudentMapping.findByPk(issueId);

        if (!issue) {
            return res.status(404).send('Book issue record not found');
        }

        // Update the return date with the current date and time
        issue.return_date = new Date();

        // Save the changes to the database
        await issue.save();

        // Redirect back to the book issue list or show a success message
        res.redirect('/book-list');  // Or show an alert via AJAX if needed
    } catch (error) {
        console.error('Error returning book:', error);
        res.status(500).send('Error returning book');
    }
};

