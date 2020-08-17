import React from 'react';

class ProjectComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.handleEdit = this.handleEdit.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
	}

	handleEdit(e) {
		console.log(e);
		//
	}

	handleDelete(e) {
		console.log(e);
	}

	render() {
		return (
			<a href="#" className="list-group-item list-group-item-action">
				<div className="clearfix">
					<div className="float-left">
						<h4>{this.props.data.name}</h4>
						<p>{this.props.data.description}</p>
					</div>
					<div className="float-right">
						<button className="btn btn-secondry" onClick={this.handleEdit} value="Edit Project">
							Edit Project
						</button>
						<button className="btn btn-secondary" onClick={this.handleDelete} value="Delete Project">
							X
						</button>
					</div>
				</div>
			</a>
		);
	}
}

export default ProjectComponent;
