import React from 'react';
import ProjectComponent from './projectItem.component';
import CreateNew from './createNew.component';
import axios from 'axios';

class ProjectViewComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			projects: [],
			activeProject: {}
		};

		this.addNew = this.addNew.bind(this);
		this.deleteProject = this.deleteProject.bind(this);
		this.editProject = this.editProject.bind(this);
		this.onClickProject = this.onClickProject.bind(this);
		this.onClickHome = this.onClickHome.bind(this);
	}

	componentDidMount() {
		axios
			.get('http://localhost:5000/projects/')
			.then((res) => {
				this.setState({
					projects: res.data.map((project) => project)
				});
			})
			.catch((err) => console.log(err));
	}

	editProject(id, project) {
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

	addNew(project) {
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

	onClickProject(ev) {
		const activeProject = this.state.projects.filter((item) => {
			return item._id == ev.currentTarget.id;
		})[0];
		this.props.setCurrentProject(activeProject);
		this.props.setHome(activeProject._id);
		this.setState({
			activeProject: activeProject
		});
	}

	onClickHome(ev) {
		this.props.setHome('home');
	}

	render() {
		return (
			<React.Fragment>
				<div className="list-group">
					<button
						value="Home"
						onClick={this.onClickHome}
						id="home"
						className="list-group-item list-group-item-action"
					>
						<h4>Home</h4>
					</button>

					{this.state.projects.map((project) => (
						<ProjectComponent
							key={project._id}
							data={project}
							deleteProject={this.deleteProject}
							editProject={this.editProject}
							onClick={this.onClickProject}
						/>
					))}
				</div>
				<CreateNew addNew={this.addNew} type="project" />
			</React.Fragment>
		);
	}
}

export default ProjectViewComponent;
