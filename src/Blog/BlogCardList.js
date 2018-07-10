import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'baltimorecounty-react-components';
import BlogCardContent from '../Blog/BlogCardContent';

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
                    return (
                        <Card key={contentItem.Id} cardType="blog">
                            <BlogCardContent contentItem={contentItem} />
                        </Card>
                    );
                })}
            </React.Fragment>
        );
    }
}

BlogCardList.propTypes = propTypes;
BlogCardList.defaultProps = defaultProps;
