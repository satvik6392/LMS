const { DataTypes, STRING, NOW, DATE } = require("sequelize");
const { sequelize } = require("./connectDB");
const {Book} = require('./book');
const {User} = require('./user');

const BookIssueStudentMapping = sequelize.define('BookIssueStudentMapping', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    book_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Book,
            key: 'id'
        }
    },
    student_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    issue_date: {
        type: DataTypes.DATE,
        defaultValue: sequelize.NOW
    },
    return_date: {
        type: DataTypes.DATE,
    }
}, {
    tableName: 'book_issue_to_student_mappings',    // Specify the table name explicitly
    timestamps: false      // Disable Sequelize auto-generating timestamps
});

BookIssueStudentMapping.belongsTo(Book, { foreignKey: 'book_id' });
BookIssueStudentMapping.belongsTo(User, { foreignKey: 'student_id' });


module.exports = {
    BookIssueStudentMapping
}