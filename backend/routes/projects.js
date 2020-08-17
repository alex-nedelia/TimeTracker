const router = require('express').Router();

const Project = require('../models/projects.model');

router.route('/').get((req, res) => {
    Project.find()
        .then(projects => res.json(projects))
        .catch(err => res.status(400).json('Error ' + err))
});

router.route('/:id').get((req, res) => {
    Project.findById(req.params.id)
        .then(project => res.json(project))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/:id').delete((req, res) => {
    Project.findByIdAndDelete(req.params.id)
        .then(() => res.json('Project deleted'))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/add').post((req, res) => {
    const name = req.body.name;
    const description = req.body.description;
    // const activities = req.body.activities;

    const newProject = new Project({
        name,
        description
    })

    newProject.save()
        .then(() => res.json('New project added'))
        .catch(err => res.status(400).json('Error ' + err))
})

router.route('/update/:id').patch((req, res) => {
    /* 
    request should be a list
    req = [{
        "propName": name,
        "value": new value
    },

    ]
     */

    const id = req.params.id;
    const opsObj = {};
    req.body.forEach(ops => {
        opsObj[ops.propName] = ops.value;
    })

    Project.findOneAndUpdate(
        { "_id": id },
        { $set: opsObj },
        { upsert: true, new: true },
        (err, doc) => {
            if (err) return res.status(404).json(
                "error: " + err);
            // console.log(doc)
            return res.status(200).json('Succesfully saved.');
        });
})

router.route('/add-activity/:id').post((req, res) => {
    const id = req.params.id;

    const activity = req.body.activity;
    console.log(activity)

    Project.findOneAndUpdate(
        { "_id": id },
        { $push: { activities: activity } },
        { upsert: true, new: true },
        (err, doc) => {
            if (err) return res.status(404).json('Error: ' + err);

            return res.status(200).json("Activity added.")

        }
    )
})

module.exports = router;