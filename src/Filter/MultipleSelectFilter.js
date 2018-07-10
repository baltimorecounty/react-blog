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
    title: 'Filter',
    type: 'single'
};

export default class MultipleSelectFilter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isExpanded: true
        };
    }

    render() {
        const { options, title, type, name, onChange } = this.props;

		console.log('type', type)

        return (
            <ul className="filter-list">
                {options.map((option, index) => (
                    <li key={index}>
						{type === 'single' && (
                            <FilterRadioButton
                                onClick={onChange}
                                label={option.label}
								value={option.value}
								name={title}
                            />
                        )}
                        {type === 'multiple' && (
                            <FilterCheckbox
                                onClick={this.handleFilterClick}
                                label={option.label}
                                value={option.value}
                            />
                        )}
                    </li>
                ))}
            </ul>
        );
    }
}

MultipleSelectFilter.propTypes = propTypes;
MultipleSelectFilter.defaultProps = defaultProps;
