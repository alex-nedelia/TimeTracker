import React from 'react';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import ProjectView from './components/projectView.component';

function App() {
	console.log(ProjectView);

	return (
		<div className="App">
			<div className="row">
				<div className="col-4 h-100">
					<React.Fragment>
						<ProjectView />
					</React.Fragment>
				</div>
				<div className="col-4">Activities</div>
				<div className="col-4">Clock</div>

				<div className="row">
					<div className="col-12">Statistics</div>
				</div>
			</div>
		</div>
	);
}

export default App;
