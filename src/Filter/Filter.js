import React from 'react';
import PropTypes from 'prop-types';
import MultipleSelectFilter from './MultipleSelectFilter';
import './Filter.css';
import { SlideDown } from 'react-slidedown';
import 'react-slidedown/lib/slidedown.css';

const propTypes = {
    onChange: PropTypes.func,
    options: PropTypes.array.isRequired,
    title: PropTypes.string,
    type: PropTypes.string
};

const defaultProps = {
    type: 'single'
};

export default class Filter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
			isExpanded: true,
			selectedFilters: []
        };

		this.toggleFilter = this.toggleFilter.bind(this);
		this.handleChange = this.handleChange.bind(this);
    }

	handleChange(filters) {
		const { isSelected, value } = filters;
        let selectedFilters = isSelected
            ? [...this.state.selectedFilters, value]
			: this.state.selectedFilters.filter(filter => filter !== value);

		if (this.props.type === 'single') {
			selectedFilters = [ value ]
		}

        this.setState(
            {
                selectedFilters
            },
            () => {
                this.props.onChange(
                    this.props.title,
                    this.state.selectedFilters
                );
            }
        );
	}



    toggleFilter() {
        this.setState({
            isExpanded: !this.state.isExpanded
        });
	}


    render() {
        const { options, title, type, onChange } = this.props;
        const toggleClass = this.state.isExpanded
            ? 'minus-square'
            : 'plus-square';

        return (
            <div className="filter-list-container">
                <h4 className="filter-toggle" onClick={this.toggleFilter}>
                    <span>{title}</span>
                    <i
                        className={`fa fa-${toggleClass}`}
                        aria-hidden="true"
                    />
                </h4>
                <SlideDown
                    className={'filter-dropdown'}
                    closed={!this.state.isExpanded}
                >
                    <MultipleSelectFilter
                        onChange={this.handleChange}
						options={options}
						type={type}
                    />
                </SlideDown>
            </div>
        );
    }
}

Filter.propTypes = propTypes;
Filter.defaultProps = defaultProps;
