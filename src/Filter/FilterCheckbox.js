import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    icon: PropTypes.string
};

const defaultProps = {};

export default class FilterCheckbox extends React.Component {
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
            <label htmlFor={`checkbox-${name}-${value}`}>
                {icon && <i className={`fa ${icon}`} />}
                <input
                    onClick={this.handleClick}
                    type="checkbox"
                    id={`checkbox-${name}-${value}`}
                    name={value}
                    value={label}
                />
                <span>{label}</span>
            </label>
        );
    }
}

FilterCheckbox.propTypes = propTypes;
FilterCheckbox.defaultProps = defaultProps;
