import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
	content: PropTypes.node,
	containerClass: PropTypes.string
};

const defaultProps = {};

export default class Card extends React.Component {
	render() {
		const { children, containerClass } = this.props;
		return (
			<div className={`card ${containerClass}`}>
				{{children}}
			</div>
		);
	}
}

 Card.propTypes = propTypes;
 Card.defaultProps = defaultProps;