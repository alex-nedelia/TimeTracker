import React from 'react';
import axios from 'axios';
import ActivityItem from '../activity/activityItem.component';
import CreateNew from '../project/createNew.component';

class ActivityView extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			activities: []
		};
		this.onAdd = this.onAdd.bind(this);
	}

	componentDidMount() {
		axios
			.get('http://localhost:5000/activities/')
			.then((res) => {
				this.setState({
					activities: res.data.map((activity) => {
						return activity;
					})
				});
			})
			.catch((err) => console.log(err));
	}

	onAdd(item) {
		console.log(item);

		const req = {
			name: item.name,
			description: item.description,
			project: this.props.currentProject._id
		};
		axios
			.post('http://localhost:5000/activities/add', req)
			.then((res) => {
				const newList = this.state.activities.map((activity) => activity);
				newList.push(res.data);
				this.setState({
					activities: newList
				});
			})
			.catch((err) => console.log(err));
	}

	render() {
		let currentPr = this.state.activities.filter((activity) => {
			return activity.project == this.props.currentProject._id;
		});
		// if (this.props.currentProject.activities.len)
		return (
			<div>
				<div>
					<CreateNew addNew={this.onAdd} type="activity" />
				</div>
				<div className="list-group">
					{this.props.home ? (
						this.state.activities.map((activity) => {
							return <ActivityItem data={activity} />;
						})
					) : currentPr.length <= 0 ? (
						<p>No activities found for this project</p>
					) : (
						currentPr.map((activity) => {
							return <ActivityItem data={activity} />;
						})
					)}
				</div>
			</div>
		);
	}
}
export default ActivityView;
