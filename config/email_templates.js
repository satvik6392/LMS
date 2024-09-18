/*
    Email Content Template for book registration mail
*/

function bookRegistrationTemplate(name, book) {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Book Registration Confirmation</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f9f9f9;
                    margin: 0;
                    padding: 20px;
                    color: #333;
                }
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    background-color: #fff;
                    padding: 20px;
                    border-radius: 5px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
                h1 {
                    color: #333;
                }
                p {
                    line-height: 1.6;
                }
                .book-details {
                    margin-top: 20px;
                }
                .book-details p {
                    font-size: 16px;
                }
                .footer {
                    margin-top: 20px;
                    font-size: 12px;
                    color: #777;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Hi ${name},</h1>
                <p>Thank you for registering the book in our system. Here are the details:</p>
                <div class="book-details">
                    <p><strong>Book Name:</strong> ${book.book_name}</p>
                    <p><strong>Author Name:</strong> ${book.author_name}</p>
                    <p><strong>ISBN:</strong> ${book.isbn}</p>
                </div>
                <p>The image of the book is attached below:</p>
                
                <div class="footer">
                    <p>If you have any questions, feel free to contact us.</p>
                    <p>Library Management System</p>
                </div>
            </div>
        </body>
        </html>
    `;
}


/*-----Attachments for book registration mail---*/
function bookRegistrationAttachment(book) {
    const attachments = [];

    // If book has a file (e.g., book image), attach it
    if (book.file) {
        attachments.push({
            filename: book.file.split('/').pop(), // Extract file name
            path: book.file, // Path to the book image
            cid: 'bookImage' // Content-ID for inline images (if needed)
        });
    }

    // You can add more dynamic attachments here as needed.
    // Example: If there are multiple files
    if (book.extraFiles && Array.isArray(book.extraFiles)) {
        book.extraFiles.forEach((file, index) => {
            attachments.push({
                filename: file.split('/').pop(), // Extract file name
                path: file, // Path to the extra file
                cid: `extraFile${index}` // Unique CID for each file if needed
            });
        });
    }

    return attachments;
}


module.exports = {
    bookRegistrationTemplate,
    bookRegistrationAttachment
};