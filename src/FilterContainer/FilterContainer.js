import React from 'react';
import PropTypes from 'prop-types';
import MultipleSelectFilter from '../Filter/MultipleSelectFilter';

const propTypes = {
	title: PropTypes.string,
	filters: PropTypes.array.isRequired
};

const defaultProps = {
	title: "Filters",
	filters: []
};

export default class FilterContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};

		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(selectedFilters) {

	}

	render() {
		const { title, filters } = this.props;
		return (
			<React.Fragment>
				<div className="filters">
					<h3 className="filters-title">{title}</h3>
					{filters.map((filter, index) => {
						if (filter.type === 'multiple-select') {
							return <MultipleSelectFilter
										onChange={this.handleChange}
										key={index}
										options={filter.options}
										title={filter.title} />;
						}
						return <p>Test</p>;
					})

					} {/* We should be able to pass in another component? */}
				</div>
			</React.Fragment>
		);
	}
}

 FilterContainer.propTypes = propTypes;
 FilterContainer.defaultProps = defaultProps;