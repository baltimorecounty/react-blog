import React from 'react';
import Skeleton from 'react-loading-skeleton';

export default class FilterSkeleton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="skeleton bc_filters filters">
                <h3 className="filters-title">
                    <Skeleton />
                </h3>
                <div className="filter-list-container">
                    <div
                        className="filter-dropdown"
                    >
                        <ul className="filter-list">
                            <li>
                                <Skeleton />
                            </li>
                            <li>
                                <Skeleton />
                            </li>
                            <li>
                                <Skeleton />
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}
