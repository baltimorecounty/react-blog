import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    name: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    onChange: PropTypes.func
};

export default class FilterRadioList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isChecked: !!this.props.isDefault
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(clickEvent) {
        const { checked, value } = clickEvent.currentTarget;
        const adjustedValue =
            value && value.toLowerCase().indexOf('all') > -1 ? '' : value;

        this.setState(
            {
                isChecked: !!checked
            },
            () => {
                this.props.onChange({
                    value: adjustedValue,
                    isSelected: this.state.isChecked
                });
            }
        );
    }

    render() {
        const { options, name } = this.props;
        const inputName = `radio-${name.toLowerCase().replace(/\s/g, '-')}`;

        return (
            <React.Fragment>
                {options.map((option, index) => {
					const { label, value, icon } = option;
					const labelName = `${inputName}-${label}`;
                    return (
                        <li key={index}>
                            <label htmlFor={labelName}>
                                {icon && <i className={`fa ${icon}`} />}
                                <input
                                    type="radio"
                                    id={labelName}
                                    name={inputName}
                                    defaultChecked={value === 'all'}
                                    onChange={this.handleChange}
                                    value={label}
                                />
                                <span>{label}</span>
                            </label>
                        </li>
                    );
                })}
            </React.Fragment>
        );
    }
}

FilterRadioList.propTypes = propTypes;
