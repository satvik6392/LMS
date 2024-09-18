// controllers/bookController.js
const {Book} = require('../models/book');
const ExcelJS = require('exceljs');
const {sendEmail} = require('../config/mail_services');
const emailTemplates = require('../config/email_templates');


/* To get the list of books to show on book list page */
exports.getBooks = async (req, res) => {
    try {
        const books = await Book.findAll();
        const username = req.session.username;
        const userid = req.session.userid;

        // Pass the list of books, username, and userid to the template
        res.render('book-list', { books, username, userid });
    } catch (error) {
        console.error('Error fetching books:', error);
        res.render('error', { message: 'Unable to fetch books' });
    }
};

/* To Add a new book in database and redirect to the book list page */
exports.addBook = async (req, res) => {
    console.log("calling add book controller");

    const { book_name, author_name, isbn } = req.body;
    
    // Get the uploaded file path
    const filePath = req.file.path;  // This contains the full path of the uploaded image
    
    try {
        // Store the book details along with the file path
        const newBook = await Book.create({
            book_name,
            author_name,
            isbn,
            file: filePath  // Save the file path to the 'file' field in the database
        });

        sendEmail(
            'satvik.trivedi@velsof.com',
            "Book Registration Completed!",
            emailTemplates.bookRegistrationTemplate('satvik',newBook),
            emailTemplates.bookRegistrationAttachment(newBook)
            
        )
        // Redirect to book-list after successfully adding a book
        res.redirect('/book-list');
    } catch (error) {
        res.render('error', { alertMessage: error.message });
    }
};

/* To export book data in excel format */
exports.exportBooks = async (req, res) => {
    
    try {
        // Fetch books data from the database
        const books = await Book.findAll();

        // Create a new Excel workbook and worksheet
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Books');

        // Define columns for the worksheet
        worksheet.columns = [
            { header: 'ID', key: 'id', width: 10 },
            { header: 'Book Name', key: 'book_name', width: 30 },
            { header: 'Author Name', key: 'author_name', width: 30 },
            { header: 'ISBN', key: 'isbn', width: 15 },
            { header: 'File', key: 'file', width: 30 },
        ];

        // Add rows to the worksheet
        books.forEach(book => {
            worksheet.addRow({
                id: book.id,
                book_name: book.book_name,
                author_name: book.author_name,
                isbn: book.isbn,
                file: book.file
            });
        });

        // Set response headers to indicate a file attachment
        res.setHeader('Content-Disposition', 'attachment; filename=books.xlsx');
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

        // Write the workbook to the response
        await workbook.xlsx.write(res);
        res.end();
        // res.redirect('/book-list');
    } catch (error) {
        console.error('Error exporting books:', error);
        res.status(500).send('Error exporting books');
    }
};


