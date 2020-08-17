import React from 'react';
const axios = require('axios');

class CreateProject extends React.Component {
	constructor(props) {
		super(props);

		this.onChangeTitle = this.onChangeTitle.bind(this);
		this.onChangeDesc = this.onChangeDesc.bind(this);
		this.onSubmit = this.onSubmit.bind(this);

		this.state = {
			name: '',
			description: ''
		};
	}

	onChangeTitle(e) {
		this.setState({ name: e.target.value });
	}
	onChangeDesc(e) {
		this.setState({ description: e.target.value });
	}

	onSubmit() {
		// e.preventDefeault
		const project = {
			name: this.state.name,
			description: this.state.description
		};
		axios.post('http://localhost:5000/projects/add', project).then((res) => console.log(res.data));
	}

	render() {
		return (
			<div>
				<div className="input-group mb-3">
					<div className="input-group-prepend">
						<span className="input-group-text" id="basic-addon1" />
					</div>
					<input
						type="text"
						className="form-control"
						placeholder="Title"
						ariaLabel="Title"
						ariaDescribedby="basic-addon1"
						onChange={this.onChangeTitle}
					/>
				</div>
				<div className="input-group mb-3">
					<div className="input-group-prepend">
						<span className="input-group-text" id="basic-addon1" />
					</div>
					<textarea
						className="form-control"
						placeholder="Type in a description for your project"
						ariaLabel="With textarea"
						onChange={this.onChangeDesc}
					/>
				</div>
				<div className="list-group-item">
					<button onClick={this.onSubmit} className="btn btn-primary w-100">
						Add new project
					</button>
				</div>
			</div>
		);
	}
}

export default CreateProject;