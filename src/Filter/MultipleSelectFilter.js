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
		const { options, title, type, onChange } = this.props;
        return (
            <ul className="filter-list">
                {options.map((option, index) => (
                    <li key={index}>
                        {type === 'multiple' && (
                            <FilterCheckbox
                                onClick={onChange}
                                isDefault={option.default}
                                label={option.label}
                                value={option.value}
                            />
                        )}
                    </li>
				))}
				{type === 'single' && (
					<FilterRadioButton
						onChange={onChange}
						options={options}
						name={title}
					/>
				)}
            </ul>
        );
    }
}

MultipleSelectFilter.propTypes = propTypes;
MultipleSelectFilter.defaultProps = defaultProps;
