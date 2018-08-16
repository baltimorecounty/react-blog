import React, { Component } from 'react';
import CardList from './Card/CardList';
import Pagination from 'react-paginate';
import FilterContainer from './FilterContainer/FilterContainer';
import { Loader } from 'baltimorecounty-react-components';
import './App.css';
import { BuildFilterExpression, Operators } from './Utils/ApiHelper';

class StructureContentList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewModel: {
                Results: {
                    Contents: []
                }
            },
            activePage: 0,
            activeFilters: {},
            baseUrl: this.props.baseUrl,
            isLoading: true,
            hasErrorGettingEntries: false,
            filters: this.props.filters
                ? this.props.filters.map(filter => {
                      filter.options = []; // ensure options
                      return filter;
                  })
                : []
        };

        this.onPageChange = this.onPageChange.bind(this);
        this.onChange = this.onChange.bind(this);
        this.getFilterOptions = this.getFilterOptions.bind(this);
    }

    buildQueryString() {
        let queryString = this.buildFilterQueryString();
        return queryString
            ? `?page=${this.state.activePage}&${queryString}`
            : `?page=${this.state.activePage}`;
    }

    buildFilterQueryString() {
        const { filters } = this.state;
        const appliedFilters = { ...this.state.activeFilters };
        let filterParts = [];

        // filters are the distinct fields being returned, if there are some in teh app, these should always be added to teh query string
        const activeFilterList = filters.map(filter => filter.field).join(',');
        if (activeFilterList) {
            filterParts.push(`filters=${activeFilterList}`);
        }

        const appliedFilterList = Object.keys(appliedFilters).map(
            appliedFilterKey => ({
                key: appliedFilterKey,
                value: appliedFilters[appliedFilterKey]
            })
        );

        if (appliedFilterList.length) {
            let filterExpression = [];
            appliedFilterList.forEach(filter => {
                if (
                    filter.value[0] &&
                    filter.value[0].toLowerCase() !== 'all'
                ) {
                    const expression = BuildFilterExpression(
                        filter.key,
                        Operators.Equal,
                        filter.value[0]
                    );
                    filterExpression.push(expression);
                }
            });

            if (filterExpression.length) {
                filterParts.push(
                    `$filter=${filterExpression.join(` ${Operators.And} `)}`
                );
            }
        }

        return filterParts.join('&');
    }

    componentDidMount() {
        this.getBlogEntries();
    }

    getBlogEntries() {
        this.setState({
            isLoading: !this.state.viewModel.Results.Contents.length
        });
        const requestUrl = this.getRequestUrl();

        fetch(requestUrl)
            .then(response => response.json())
            .then(contentViewModel => {
                this.setState({
                    viewModel: contentViewModel,
                    isLoading: false,
                    filters: this.getFilterOptions(
                        contentViewModel.FilterValues
                    )
                });
            })
            .catch(error => {
                this.setState({
                    hasErrorGettingEntries: true,
                    isLoading: false
                });
            });
    }

    getRequestUrl() {
        const queryString = this.buildQueryString();

        return `${this.state.baseUrl}${queryString}`;
    }

    getFilterOptions(filterValues) {
        return this.state.filters.map(filter => {
            filter.options = filterValues[filter.field];
            if (filter.type === 'radio') {
                filter.options.unshift({
                    label: 'Show All',
                    value: 'all'
                });
            }
            return filter;
        });
    }

    onChange(filter) {
        const { field, values } = filter;
        const newActiveFilters = { ...this.state.activeFilters };

        if (values.length) {
            newActiveFilters[field] = values;
        } else {
            delete newActiveFilters[field];
        }

        this.setState(
            {
                activeFilters: newActiveFilters,
                activePage: 0
            },
            () => {
                this.getBlogEntries();
            }
        );
    }

    onPageChange(pageInfo) {
        this.setState(
            {
                activePage: pageInfo.selected + 1 // 0 based
            },
            this.getBlogEntries
        );
    }

    render() {
        const { activePage } = this.state;
        const { cardContentComponent } = this.props;
        const { TotalPages, Results } = this.state.viewModel;
        const defaultButtonClasses = 'btn btn-default';

        return (
            <div className="Blog">
                <div className="row">
                    <div className="col-md-3">
                        <FilterContainer
                            title="Blog Filters"
                            filters={this.state.filters}
                            onChange={this.onChange}
                        />
                    </div>
                    <div className="col-md-9">
                        <CardList
                            contentType="blog"
                            contentItems={Results.Contents}
                            cardContentComponent={cardContentComponent}
                        />
                        {this.state.isLoading && <Loader />}
                        {this.state.hasErrorGettingEntries && (
                            <p>
                                There was a problem retrieving our Between the
                                Covers posts. Please try again in a few minutes.
                            </p>
                        )}
                        {TotalPages && (
                            <Pagination
                                previousLabel={'Previous'}
                                nextLabel={'Next'}
                                breakLabel={<a href="">...</a>}
                                breakClassName={'break-me'}
                                pageCount={TotalPages}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={5}
                                onPageChange={this.onPageChange}
                                containerClassName={'pager'}
                                subContainerClassName={'pages pagination'}
                                pageLinkClassName={defaultButtonClasses}
                                previousLinkClassName={defaultButtonClasses}
                                nextLinkClassName={defaultButtonClasses}
                                activeClassName={'active'}
                                forcePage={activePage}
                            />
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default StructureContentList;
