import React from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonGroup } from 'react-bootstrap';
import './FilterList.css';

const propTypes = {
    filterList: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired
};

const defaultProps = {};

export default class FilterList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeFilter: null
        };

        this.onButtonClick = this.onButtonClick.bind(this);
        this.isActive = this.isActive.bind(this);
    }

    isActive(item) {
        return this.state.activeFilter === item.name;
    }

    onButtonClick(clickEvent) {
        const { currentTarget } = clickEvent;

        this.setState(
            {
                activeFilter: currentTarget.textContent.trim()
            },
            () => {
                this.props.onChange(this.state.activeFilter);
            }
        );
    }

    render() {
        const { filterList } = this.props;

        const filters = filterList.map((item, itemIndex) => {
            return (
                <h4 key={itemIndex}>
                    <Button
                        onClick={this.onButtonClick}
                        active={this.isActive(item)}
                    >
                        {item.icon && (
                            <i className={`fa fa-icon ${item.icon}`} />
                        )}{' '}
                        {item.name}
                    </Button>
                    )
                </h4>
            );
        });

        return (
            <React.Fragment>
                <ButtonGroup className="filter-group">{filters}</ButtonGroup>
            </React.Fragment>
        );
    }
}

FilterList.propTypes = propTypes;
FilterList.defaultProps = defaultProps;
