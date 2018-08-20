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
    contentItems: []
};

export default class CardList extends React.Component {
    render() {
		const { cardContentComponent: CardContentComponent } = this.props;
		const cards = this.props.contentItems.map(contentItem => {
			return (
				<Card
					key={contentItem.Id}
					cardType={this.props.contentType}
				>
					<CardContentComponent
						contentItem={contentItem}
					/>
				</Card>
			);
		});
		const animationDelay = 250;

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
