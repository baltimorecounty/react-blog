import React from "react";
import PropTypes from "prop-types";
import { format } from "date-fns";

const propTypes = {
  contentItem: PropTypes.object.isRequired
};

const getCategoryImage = category => {
  switch (category) {
    case "News":
      return "/sebin/v/f/blog-default-news.jpg";
    case "Programming and Events":
      return "/sebin/t/i/blog-default-events.jpg";
    case "Collection and Materials":
    default:
      return "/sebin/d/w/blog-default-reviews.jpg";
  }
};

export default class BlogCardContent extends React.Component {
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
      ImageAlt,
      Pin_Blog_Entry
    } = this.props.contentItem;
    // console.log(this.props.contentItem);
    const postImage = ImageUrl || getCategoryImage(Category);

    return (
      <React.Fragment>
      <div class="box">
         <div class="ribbon ribbon-top-right"><span>Featured</span></div>
        {/* <div className="card-content-img-container"> */}
          {/* <div className="fa fa-thumb-tack pin-icon" aria-hidden='true'> </div>  */}
          {Pin_Blog_Entry === true && this.props.indexItems === 0 ? (
            <div className="ribbon ribbon-top-right" aria-hidden="true">
              {" "}
            </div>
          ) : (
            ""
          )}
          <a href={Link}>
            <img
              alt={ImageAlt}
              className="card-content-img"
              src={`//www.bcpl.info${postImage}`}
            />
          </a>
        </div>
        {/* </div> */}

        <div className="card-content">
          <h2 className="card-heading">
            <a href={Link}>{Title}</a>
          </h2>
          <div className="card-content-date">
            {format(PublishedDate, "MMMM D, YYYY")} | <span>By {Author}</span>
          </div>
          <div className="card-content-summary SEPost_Short_Description">
            {ShortDescription}
          </div>
        </div>

        <div className="card-icon-callout hidden-xs">
          <i className={`blog-widget-item-icon fa fa-3x ${CategoryIcon}`} />
          <p>{Category}</p>
        </div>
      </React.Fragment>
    );
  }
}

BlogCardContent.propTypes = propTypes;
