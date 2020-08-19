import React from 'react';

import ProjectView from '../components/project/projectView.component';
import ActivityView from '../components/activity//activityView.component';

class MainView extends React.Component {
	constructor(props) {
		super(props);

		this.setCurrentProject = this.setCurrentProject.bind(this);

		this.state = {
			currentProject: {},
			home: true
		};
	}

	setCurrentProject(project) {
		console.log(project);
		this.setState({
			currentProject: project
		});
	}

	setHome = (id) => {
		this.setState({
			home: id == 'home' ? true : false
		});
	};

	render() {
		return (
			<div className="row">
				<div className="col-4 h-100">
					<React.Fragment>
						<ProjectView setHome={this.setHome} setCurrentProject={this.setCurrentProject} />
					</React.Fragment>
				</div>
				<div className="col-4">
					<React.Fragment>
						<ActivityView currentProject={this.state.currentProject} home={this.state.home} />
					</React.Fragment>
				</div>
				<div className="col-4">Clock</div>

				<div className="row">
					<div className="col-12">Statistics</div>
				</div>
			</div>
		);
	}
}

export default MainView;
