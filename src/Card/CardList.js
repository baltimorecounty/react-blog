import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransitionGroup } from 'react-transition-group'; // ES6
import { Card } from 'baltimorecounty-react-components';
import './CardList.css';

const propTypes = {
    contentType: PropTypes.string,
    contentItems: PropTypes.array
};

const defaultProps = {
    contentItems: [],
    contentType: 'default'
};

export default class CardList extends React.Component {
    render() {
        const animationDelay = 250;
        const {
            cardContentComponent: CardContentComponent,
            contentItems,
            contentType
        } = this.props;
        const cards = contentItems.map(contentItem => {
            return (
                <Card key={contentItem.Id} cardType={contentType}>
                    <CardContentComponent contentItem={contentItem} />
                </Card>
            );
        });

        return (
            <React.Fragment>
                <CSSTransitionGroup
                    transitionName="list-fade"
                    transitionEnterTimeout={animationDelay}
                    transitionLeaveTimeout={animationDelay}
                    transitionAppear={true}
                    transitionAppearTimeout={animationDelay}
                >
                    {cards}
                </CSSTransitionGroup>
            </React.Fragment>
        );
    }
}

CardList.propTypes = propTypes;
CardList.defaultProps = defaultProps;
