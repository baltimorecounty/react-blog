import React from 'react';

export default class Loader extends React.Component {
	render() {
		return (
			<React.Fragment>
				<i className="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
				<span className="sr-only">Loading...</span>
			</React.Fragment>
		);
	}
}