const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const secretKey = 'secret';

const authRoutes = require('./routes/auth');
const usersRouter = require('./routes/users');
const courseRouter = require('./routes/course');

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb+srv://jirapotchgent:pass1234@cluster0.y4t6iel.mongodb.net/skilllane-demo?retryWrites=true&w=majority', { useNewUrlParser: true })
    .then(() => console.log("Connection successfully"))
    .catch((err) => console.log(err))


app.use('/auth', authRoutes);
app.use('/users', authenticateToken, usersRouter);
app.use('/course', authenticateToken, courseRouter);

function authenticateToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) return res.sendStatus(401);

    const authorization = req.headers.authorization.split(" ")[1];

    jwt.verify(authorization, secretKey, (err, user) => {
        if (err) return res.sendStatus(403);
        next();
    });
}

app.listen(port, () => {
    console.log(`Server is running on port : ${port}`)
})

module.exports = app