import React from 'react';
import ProjectComp from './projectItem.component';
import CreateProject from './createProject.component';
import axios from 'axios';

class ProjectViewComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			projects: ''
		};
	}
	componentDidMount() {
		axios
			.get('http://localhost:5000/projects/')
			.then((res) => {
				console.log(res.data);
				this.setState({
					projects: res.data.map((project) => project)
				});
			})
			.catch((err) => console.log(err));
	}
	render() {
		const projects = Array.from(this.state.projects);
		return (
			<React.Fragment>
				<div className="list-group">
					<a href="#" className="list-group-item list-group-item-action">
						<h4>Home</h4>
					</a>

					{projects.map((project) => <ProjectComp data={project} />)}
				</div>
				<CreateProject />
			</React.Fragment>
		);
	}
}

export default ProjectViewComponent;
