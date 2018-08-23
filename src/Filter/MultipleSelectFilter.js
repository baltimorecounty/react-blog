import React from 'react';
import PropTypes from 'prop-types';
import FilterCheckbox from './FilterCheckbox';
import FilterRadioButton from './FilterRadioButton';

const propTypes = {
    onChange: PropTypes.func,
    options: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.string
};

const defaultProps = {
    type: 'radio'
};

export default class MultipleSelectFilter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isExpanded: true
        };
    }

    render() {
        const { options, title, type, onChange } = this.props;
        return (
            <React.Fragment>
                {options && (
                    <ul className="filter-list">
                        {type === 'multiple' &&
                            options.map((option, index) => (
                                <li key={index}>
                                    <FilterCheckbox
                                        onClick={onChange}
                                        label={option.label}
                                        value={option.value}
                                    />
                                </li>
                            ))}
                        {type === 'radio' && (
                            <FilterRadioButton
                                onChange={onChange}
                                options={options}
                                name={title}
                            />
                        )}
                    </ul>
                )}
            </React.Fragment>
        );
    }
}

MultipleSelectFilter.propTypes = propTypes;
MultipleSelectFilter.defaultProps = defaultProps;
