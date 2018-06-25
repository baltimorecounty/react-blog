import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
	contentItem: PropTypes.object.isRequired
};

export default class BlogCard extends React.Component {
	render() {
		const {
			Title,
			PublishedDate,
			Author,
			ShortDescription,
			Category,
			CategoryIcon,
			Link,
			ImageUrl,
			ImageAlt
		} = this.props.contentItem;

		return (
			<div className="card card--blog">
				<div className="card-content-img-container">
					<a href={Link}>
						<img alt={ImageAlt} className="card-content-img" src={ImageUrl} />
					</a>
				</div>
				<div className="card-content">
					<h2 className="card-heading">
						<a href={Link}>{Title}</a>
					</h2>
					<div className="card-content-date">
						{PublishedDate} | <span>By {Author}</span>
					</div>
					<div className="card-content-summary SEPost_Short_Description">
						{ShortDescription}
					</div>
				</div>
				<div className="card-icon-callout hidden-xs">
					<i className={`blog-widget-item-icon fa fa-5x ${CategoryIcon}`}></i>
					<p>{Category}</p>
				</div>
			</div>
		);
	}
}

BlogCard.propTypes = propTypes;