const router = require('express').Router();
const TimeEntry = require('../models/timestamps.models').TimeEntry;

router.route('/').get((req, res) => {
    TimeEntry.find()
        .then(timestamps => res.json(timestamps))
        .catch(err => res.status(400).json('Error' + err))
})

router.route('/:id').get((req, res) => {
    TimeEntry.findById(req.params.id)
        .then(timeEntry => res.json(timeEntry))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/:id').delete((req, res) => {
    TimeEntry.findByIdAndDelete(req.params.id)
        .then(() => res.json('Entry deleted'))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/add').post((req, res) => {
    const user = req.body.user;
    const taskName = req.body.taskName;
    const project = req.body.project;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const startTime = Date.parse(req.body.startTime)
    const endTime = Date.parse(req.body.endTime)


    const newTimeEntry = new TimeEntry({
        user,
        taskName,
        project,
        description,
        duration,
        startTime,
        endTime
    });

    newTimeEntry.save()
        .then(() => res.json('timeEntry added'))
        .catch(err => res.status(400).json('Error ' + err))
});

router.route('/update/:id').post((req, res) => {
    TimeEntry.findById(req.params.id)
        .then(timeEntry => {
            timeEntry.user = req.body.user;
            timeEntry.taskName = req.body.taskName;
            timeEntry.project = req.body.project;
            timeEntry.description = req.body.description;
            timeEntry.duration = Number(req.body.duration);
            timeEntry.startTime = Date.parse(req.body.startTime)
            timeEntry.endTime = Date.parse(req.body.endTime)

            timeEntry.save()
                .then(() => res.json('Time Entry updated'))
                .catch(err => res.status(400).json('Error ' + err))
        })
        .catch(err => res.status(400).json('Error ' + err));
})

module.exports = router;