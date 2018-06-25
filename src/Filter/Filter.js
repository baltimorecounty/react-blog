import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {};

const defaultProps = {};

export default class Filter extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<React.Fragment>
				<div className="filter">
					Filter goes here
				</div>
			</React.Fragment>
		);
	}
}

 Filter.propTypes = propTypes;
 Filter.defaultProps = defaultProps;