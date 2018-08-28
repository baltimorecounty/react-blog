import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    totalRecordsShown: PropTypes.number.isRequired,
    totalRecords: PropTypes.number.isRequired
};

export default class FilterInformation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { totalRecordsShown, totalRecords } = this.props;

        return (
            <React.Fragment>
                <em style={{ display: 'block' }}>
                    Showing{' '}
                    {totalRecordsShown > totalRecords
                        ? totalRecords
                        : totalRecordsShown}{' '}
                    of {totalRecords} posts.
                </em>
            </React.Fragment>
        );
    }
}

FilterInformation.propTypes = propTypes;
