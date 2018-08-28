import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    currentPage: PropTypes.number.isRequired,
    totalRecords: PropTypes.number.isRequired,
    recordsPerPage: PropTypes.number.isRequired
};

export default class FilterInformation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { currentPage, recordsPerPage, totalRecords } = this.props;
        const visiblePages = currentPage * recordsPerPage;

        return (
            <React.Fragment>
                <em style={{ display: 'block' }}>
                    Showing{' '}
                    {visiblePages > totalRecords ? totalRecords : visiblePages}{' '}
                    of {totalRecords} posts.
                </em>
            </React.Fragment>
        );
    }
}

FilterInformation.propTypes = propTypes;
