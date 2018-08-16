import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'baltimorecounty-react-components';

const propTypes = {
    contentType: PropTypes.string,
    contentItems: PropTypes.array
};

const defaultProps = {
    contentItems: []
};

export default class CardList extends React.Component {
    render() {
        const { cardContentComponent: CardContentComponent } = this.props;
        return (
            <React.Fragment>
                {this.props.contentItems.map(contentItem => {
                    return (
                        <Card
                            key={contentItem.Id}
                            cardType={this.props.contentType}
                        >
                            <CardContentComponent contentItem={contentItem} />
                        </Card>
                    );
                })}
            </React.Fragment>
        );
    }
}

CardList.propTypes = propTypes;
CardList.defaultProps = defaultProps;
