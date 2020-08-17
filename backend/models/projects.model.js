const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const activitySchema = require('../models/activities.model').activitySchema;

const projectsSchema = new Schema({
	// _id: {
	//     type: mongoose.ObjectId
	// },

	name: {
		type: String,
		required: true
	},
	timeSpent: { type: Number },
	activities: [ activitySchema ],
	description: { type: String }
});

const Project = mongoose.model('Project', projectsSchema);

module.exports = Project;
