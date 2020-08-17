const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const timeEntrySchema = require('./timestamps.models').timeEntrySchema

const activitySchema = new Schema({
    _id: mongoose.Types.ObjectId,

    name: {
        type: String,
        required: true
    },

    project: {
        type: mongoose.ObjectId
    },

    timeSpent: {
        type: Number,
    },

    timeEntries: [timeEntrySchema],

    description: { type: String },

})

const Activity = mongoose.model('Activity', activitySchema)

module.exports = { Activity, activitySchema }