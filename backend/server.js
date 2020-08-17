
/* Server file for TimerApp 

Using express and mongoose to create a server and connect to a database

*/
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// importing routers
const timestampsRouter = require('./routes/timestamps');
const usersRouter = require('./routes/users');
const activityRouter = require('./routes/activities')
const projectRouter = require('./routes/projects')


require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json())

const uri = process.env.ATLAS_URI;

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const connection = mongoose.connection;

connection.once('open', () => {
    console.log('MangoDB connection success')
});

// telling the server to use the importer routers
app.use('/timestamps', timestampsRouter);
app.use('/users', usersRouter);
app.use('/activities', activityRouter);
app.use('/projects', projectRouter)

app.listen(port, () => {
    console.log(`server is running on port: ${port}`)
});

