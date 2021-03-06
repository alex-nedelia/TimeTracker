import React from 'react';

import Details from './projectDetails.component';

class ProjectComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = { edit: false, name: '', description: '' };
		this.handleEdit = this.handleEdit.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
		this.sendDetails = this.sendDetails.bind(this);
		this.editCallback = this.editCallback.bind(this);
	}

	sendDetails() {
		const req = [
			{
				propName: 'name',
				value: this.state.name
			},
			{
				propName: 'description',
				value: this.state.description
			}
		];

		this.props.editProject(this.props.data._id, req);
	}

	editCallback(project) {
		this.setState({
			name: project.name,
			description: project.description
		});
	}

	handleEdit() {
		if (this.state.edit) {
			this.sendDetails();
			this.setState({
				edit: false
			});
		} else {
			this.setState({
				edit: true
			});
		}
		//
	}

	handleDelete() {
		let id = this.props.data._id;
		this.props.deleteProject(id);
	}

	render() {
		return (
			<a
				id={this.props.data._id}
				href="#"
				onClick={this.props.onClick}
				className="list-group-item list-group-item-action"
			>
				<div className="row">
					<Details data={this.props.data} edit={this.state.edit} editCallback={this.editCallback} />
					<div className="col-3 btn-group-sm" role="group" ariaLabel="...">
						<button type="button" className="btn btn-sm" onClick={this.handleEdit} value="Edit Project">
							{this.state.edit ? 'Save' : 'Edit'}
						</button>
						<button
							type="button"
							className="btn btn-danger btn-sm"
							onClick={this.handleDelete}
							value="Delete Project"
						>
							X
						</button>
					</div>
				</div>
			</a>
		);
	}
}

export default ProjectComponent;
