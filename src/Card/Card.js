import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
	cardType: PropTypes.string
};

const defaultProps = {
	cardType: 'default'
};

function Card({children, cardType}) {
	return (
		<div className={`card card--${cardType}`}>
			{children}
		</div>
	);
}

 Card.propTypes = propTypes;
 Card.defaultProps = defaultProps;

 export default Card;