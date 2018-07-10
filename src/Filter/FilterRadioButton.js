import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    icon: PropTypes.string
};

const defaultProps = {};

export default class FilterRadioList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(clickEvent) {
		const { currentTarget } = clickEvent;

        this.props.onClick({
            value: currentTarget.value,
            isSelected: currentTarget.checked
        });
    }

    render() {
        const { label, value, icon, name } = this.props;

        return (
            <label htmlFor={value}>
                <input
                    onClick={this.handleClick}
                    type="radio"
                    id={value}
                    name={name}
                    value={label}
                />
                <span>{label}</span>
            </label>
        );
    }
}

FilterRadioList.propTypes = propTypes;
FilterRadioList.defaultProps = defaultProps;
