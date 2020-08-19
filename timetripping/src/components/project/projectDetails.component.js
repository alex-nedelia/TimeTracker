import React from 'react';

class Details extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			id: this.props.data.id,
			name: this.props.data.name,
			description: this.props.data.description
		};

		this.onChangeTitle = this.onChangeTitle.bind(this);
		this.onChangeDesc = this.onChangeDesc.bind(this);
	}

	onChangeTitle(e) {
		this.setState({ name: e.target.value });
		this.props.editCallback(this.state);
	}
	onChangeDesc(e) {
		this.setState({ description: e.target.value });
		this.props.editCallback(this.state);
	}

	edit() {
		return (
			<div className="col-9">
				<div className="input-group mb-3">
					<input
						type="text"
						className="form-control"
						placeholder={this.state.name}
						ariaLabel="Title"
						ariaDescribedby="basic-addon1"
						onChange={this.onChangeTitle}
						value={this.state.name}
					/>
				</div>
				<div className="input-group mb-3">
					<textarea
						className="form-control"
						placeholder={this.state.description}
						ariaLabel="With textarea"
						onChange={this.onChangeDesc}
						value={this.state.description}
					/>
				</div>
			</div>
		);
	}
	display() {
		return (
			<div className="col-9">
				<h4>{this.state.name}</h4>
				<p>{this.state.description}</p>
			</div>
		);
	}

	render() {
		return this.props.edit ? this.edit() : this.display();
	}
}

export default Details;
