import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
	contentItem: PropTypes.object.isRequired
};

const getCategoryImage = (category) => {
	switch(category) {
		case "News":
			return "/sebin/v/f/blog-default-news.jpg";
		case "Programming and Events":
			return "/sebin/t/i/blog-default-events.jpg";
		case "Collection and Materials":
		default:
			return "/sebin/d/w/blog-default-reviews.jpg";
	}
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

		const postImage = ImageUrl || getCategoryImage(Category);

		return (
			<div className="card card--blog">
				<div className="card-content-img-container">
					<a href={Link}>
						<img alt={ImageAlt} className="card-content-img" src={`//www.bcpl.info${postImage}`} />
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