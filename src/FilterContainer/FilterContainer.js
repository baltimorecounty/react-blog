import React from 'react';
import PropTypes from 'prop-types';
import Filter from '../Filter/Filter';

const propTypes = {
    title: PropTypes.string,
    filters: PropTypes.array.isRequired,
    onChange: PropTypes.func,
    type: PropTypes.string
};

const defaultProps = {
    title: 'Filters',
    filters: []
};

export default class FilterContainer extends React.Component {
    render() {
        const { title, filters, onChange } = this.props;

        return (
            <React.Fragment>
                {filters && filters.length && (
                    <div className="bc_filters filters">
                        <h3 className="filters-title">{title}</h3>
                        {filters.map((filter, index) => (
                            <Filter
                                onChange={onChange}
                                key={index}
                                filter={filter}
                            />
                        ))}{' '}
                        {/* We should be able to pass in another component? */}
                    </div>
                )}
            </React.Fragment>
        );
    }
}

FilterContainer.propTypes = propTypes;
FilterContainer.defaultProps = defaultProps;
