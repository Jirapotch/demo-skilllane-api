var express = require('express');
var router = express.Router();
const moment = require('moment/moment.js');
const Course = require('../models/Course.js');
const Users = require('../models/Users.js');

const errorHandler = (err, res) => {
    console.error(err);
    res.status(500).json({ error: 'An error occurred' });
};

router.get('/', async function (req, res, next) {
    try {
        let response = await Course.find().exec()
        let result = []
        for (const r of response) {
            let data_instructor = []
            for (const inst of r.instructor) {
                let user_data = await Users.findById(inst).exec();
                data_instructor.push({
                    name: (user_data.firstName || '') + ' ' + (user_data.lastName || '') + (user_data.nickname ? ' (' + user_data.nickname + ')' : ''),
                    description: user_data.description || '',
                    image: user_data.image
                })
            }
            result.push({ ...r._doc, instructor: data_instructor })
        }
        res.status(200).json(result);
    } catch (err) {
        errorHandler(err, res);
    }
});

router.get('/:id', function (req, res, next) {
    Course.findById(req.params.id)
        .then((response) => {
            res.send(response);
        })
        .catch((err) => next(err))
});

router.post('/', function (req, res, next) {
    Course.create(req.body)
        .then((response) => {
            res.send()
        })
        .catch((err) => next(err))
});

router.put('/:id', function (req, res, next) {
    let data = { ...req.body, update_date: moment() }
    Course.findByIdAndUpdate(req.params.id, data)
        .then((response) => {
            res.send()
        })
        .catch((err) => next(err))
});

router.delete('/:id', function (req, res, next) {
    Course.findByIdAndDelete(req.params.id)
        .then((response) => {
            res.send()
        })
        .catch((err) => next(err))
});

module.exports = router;
