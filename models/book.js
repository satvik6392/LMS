// models/book.js
const { DataTypes } = require("sequelize");
const { sequelize } = require("./connectDB");

const Book = sequelize.define('Book', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    book_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    author_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    isbn: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    file: {
        type: DataTypes.STRING, // or DataTypes.BLOB if storing files directly
        allowNull: true,
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    modified_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: 'books',
    timestamps: false,
});

module.exports = {
    Book
};
