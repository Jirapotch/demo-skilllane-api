const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    nickname: String,
    birthday: Date,
    gender: String,
    role: String, // 'Student' or 'Instructor'
    description: String,
    image: String,
    create_date: { type: Date, default: Date.now },
    update_date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('users', UserSchema)