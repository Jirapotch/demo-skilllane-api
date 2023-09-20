var express = require('express');
var router = express.Router();
const moment = require('moment/moment.js');
const Users = require('../models/Users.js');

const errorHandler = (err, res) => {
    console.error(err);
    res.status(500).json({ error: 'An error occurred' });
};


router.get('/', function (req, res) {
    Users.find()
        .then((response) => {
            res.send(response);
        })
        .catch((err) => errorHandler(err, res))
});

router.get('/instructor-list', async (req, res) => {
    try {
        const instructors = await Users.find({ role: 'Instructor' }).exec();
        const instructorOptions = instructors.map((instructor) => ({
            value: instructor._id,
            label: `${instructor.firstName || ''} ${instructor.lastName || ''}`,
        }));

        res.status(200).json(instructorOptions);
    } catch (err) {
        errorHandler(err, res);
    }
});

router.get('/:id', function (req, res) {
    Users.findById(req.params.id)
        .then((response) => {
            res.send(response);
        })
        .catch((err) => errorHandler(err, res))
});

router.post('/', function (req, res) {
    Users.create(req.body)
        .then((response) => {
            res.status(201).send();
        })
        .catch((err) => errorHandler(err, res))
});

router.put('/:id', function (req, res) {
    let data = { ...req.body, update_date: moment() }
    Users.findByIdAndUpdate(req.params.id, data)
        .then((response) => {
            res.send()
        })
        .catch((err) => errorHandler(err, res))
});

router.delete('/:id', function (req, res) {
    Users.findByIdAndDelete(req.params.id)
        .then((response) => {
            res.send()
        })
        .catch((err) => errorHandler(err, res))
});

module.exports = router;
