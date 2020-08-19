import React from 'react';

class Activity extends React.Component {
	render() {
		return (
			<a id={this.props.data._id} className="list-group-item list-group-item-action">
				<div>
					<h4>{this.props.data.name}</h4>
					<p>{this.props.data.description}</p>
				</div>
			</a>
		);
	}
}

export default Activity;
