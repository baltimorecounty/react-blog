import React from 'react';
import { Card } from 'baltimorecounty-react-components';
import Skeleton from 'react-loading-skeleton';
import './BlogSkeleton.css';

export default class CardSkeleton extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Card>
                    <div className="skeleton blog-skeleton">
                        <div className="blog-skeleton-image skeleton-height-100">
                            <Skeleton />
                        </div>
                        <div className="blog-skeleton-content">
                            <h2>
                                <Skeleton width="90%" />
                            </h2>
                            <Skeleton count={3} width="90%" />
                        </div>
                        <div className="blog-skeleton-icon-container">
                            <div className="blog-skeleton-icon skeleton-height-100">
                                <Skeleton width="50%" />
                            </div>
                            <p className="blog-skeleton-icon-caption">
                                <Skeleton width="50%" />
                            </p>
                        </div>
                    </div>
                </Card>
            </React.Fragment>
        );
    }
}
