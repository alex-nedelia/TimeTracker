const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const timeEntrySchema = new Schema({
    user: { type: String, required: true },
    taskName: { type: String, required: true },
    project: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: Number, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true }
},
    { timestamp: true }
);


const TimeEntry = mongoose.model('timeentry', timeEntrySchema);

module.exports = { TimeEntry, timeEntrySchema };
