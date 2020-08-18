import React from 'react';
import ProjectComponent from './projectItem.component';
import CreateProject from './createProject.component';
import axios from 'axios';

class ProjectViewComponent extends React.Component {
	constructor(props) {
		super(props);
		this.addNewProject = this.addNewProject.bind(this);
		this.deleteProject = this.deleteProject.bind(this);
		this.editProject = this.editProject.bind(this);
		this.state = {
			projects: []
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

	editProject(id, project) {
		console.log(id, project);
		axios.patch(`http://localhost:5000/projects/update/${id}`, project).then((res) => {
			const editProject = this.state.projects.map((pro) => {
				if (pro._id == id) {
					pro.name = project.name;
					pro.description = project.description;
				}
				return pro;
			});
			this.setState({
				projects: editProject
			});
		});
	}

	addNewProject(project) {
		const projectList = Array.from(this.state.projects);

		axios.post('http://localhost:5000/projects/add', project).then((res) => {
			projectList.push(res.data);
			this.setState({ projects: projectList });
		});
	}

	deleteProject(id) {
		axios
			.delete(`http://localhost:5000/projects/${id}`)
			.then((res) => {
				console.log(res);
				this.setState({
					projects: this.state.projects.filter((project) => {
						return project._id !== id;
					})
				});
			})
			.catch((err) => console.log(err));
	}

	render() {
		return (
			<React.Fragment>
				<div className="list-group">
					<a href="#" className="list-group-item list-group-item-action">
						<h4>Home</h4>
					</a>

					{this.state.projects.map((project) => (
						<ProjectComponent
							data={project}
							deleteProject={this.deleteProject}
							editProject={this.editProject}
						/>
					))}
				</div>
				<CreateProject addNewProject={this.addNewProject} />
			</React.Fragment>
		);
	}
}

export default ProjectViewComponent;
