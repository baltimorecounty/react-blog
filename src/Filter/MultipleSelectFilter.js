import React from 'react';
import PropTypes from 'prop-types';
import FilterCheckbox from './FilterCheckbox';

const propTypes = {
	onChange: PropTypes.func,
	options: PropTypes.array.isRequired,
	title: PropTypes.string
};

const defaultProps = {
	title: "Filter"
};

export default class MultipleSelectFilter extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedFilters: []
		};

		this.handleFilterClick = this.handleFilterClick.bind(this);
	}

	handleFilterClick(selectedFilter) {
		const { isSelected, value } = selectedFilter;
		const selectedFilters = isSelected
			? [...this.state.selectedFilters, value]
			: this.state.selectedFilters.filter(filter => filter !== value);

		this.setState({
			selectedFilters
		}, () => {
			this.props.onChange(this.props.title, this.state.selectedFilters);
		});
	}

	render() {
		const { options, title } = this.props;

		return (
			<ul className="filter-container">
				<button>{title} <i className="fa fa-plus-square" aria-hidden="true"></i></button>
				{options.map((option, index) =>
					<li key={index}>
						<FilterCheckbox
							onClick={this.handleFilterClick}
							label={option.label}
							value={option.value} />
					</li>)
				}
			</ul>
		);
	}
}

 MultipleSelectFilter.propTypes = propTypes;
 MultipleSelectFilter.defaultProps = defaultProps;