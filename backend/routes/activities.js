const router = require('express').Router();
const mongoose = require('mongoose')
const Activity = require('../models/activities.model').Activity;

router.route('/').get((req, res) => {
    Activity.find()
        .then(activities => res.json(activities))
        .catch(err => res.status(400).json('Error ' + err))
});

router.route('/add').post((req, res) => {

    const newActivity = new Activity({
        _id: new mongoose.Types.ObjectId,
        name: req.body.name,
        project: req.body.project,
        description: req.body.description
    })

    newActivity.save()
        .then(() => res.status(200).json('Activity added'))
        .catch(err => res.status(404).json("Error: " + err))
})

module.exports = router;