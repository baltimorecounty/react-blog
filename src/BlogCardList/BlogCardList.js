import React from 'react';
import PropTypes from 'prop-types';
import BlogCard from '../BlogCard/BlogCard';

const propTypes = {
	contentType: PropTypes.string,
	contentItems: PropTypes.array
};

const defaultProps = {
	contentItems: []
};

export default class BlogCardList extends React.Component {
	render() {
		return (
			<React.Fragment>
				{this.props.contentItems.map(contentItem => {
					return <BlogCard key={contentItem.Id} contentItem={contentItem}></BlogCard>
				})

				}
			</React.Fragment>
		);
	}
}

 BlogCardList.propTypes = propTypes;
 BlogCardList.defaultProps = defaultProps;