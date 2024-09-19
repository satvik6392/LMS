const { DataTypes, STRING, INTEGER } = require("sequelize");
const { sequelize } = require("./connectDB");
const bcrypt = require('bcrypt');


const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    middle_name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false
    },
    roll_no:{
        type: DataTypes.INTEGER,
        allowNull: true
    },
    phone_no:{
        type: DataTypes.STRING,
        allowNull: true
    },
    file:{
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: 'users',    // Specify the table name explicitly
    timestamps: false,      // Disable Sequelize auto-generating timestamps
    hooks: {
        beforeCreate: async (user) => {
            if (user.password) {
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(user.password, salt);
            }
        },
        beforeUpdate: async (user) => {
            if (user.password) {
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(user.password, salt);
            }
        }
    }
});

module.exports = {
    User
};