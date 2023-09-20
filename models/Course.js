const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    instructor: [String],
    time: String,
    price: Number,
    price_credits_collected: Number,
    category: String,
    image: String,
    number_of_student: Number,
    create_date: { type: Date, default: Date.now },
    update_date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('course', CourseSchema)