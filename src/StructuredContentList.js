import React, { Component } from 'react';
import CardList from './Card/CardList';
import Pagination from 'react-paginate';
import FilterContainer from './FilterContainer/FilterContainer';
import { Loader } from 'baltimorecounty-react-components';
import './App.css';

class StructureContentList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewModel: {
                Results: {
                    Contents: []
                }
            },
            activePage: 1,
            categoryFilter: null,
            baseUrl: this.props.baseUrl,
            isLoading: true,
            hasErrorGettingEntries: false,
            filters: this.props.filters.slice()
        };

        this.onPageChange = this.onPageChange.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    buildQueryString() {
        const { categoryFilter } = this.state;

        const filterQueryString =
            categoryFilter &&
            categoryFilter.length &&
            categoryFilter.filter(category => category.toLowerCase() !== 'all')
                .length
                ? `&Category=${categoryFilter}`
                : '';

        return `?page=${this.state.activePage}${filterQueryString}`;
    }

    componentDidMount() {
        this.getBlogEntries(this.state.activePage);
    }

    getBlogEntries() {
        this.setState({
            isLoading: !this.state.viewModel.Results.Contents.length
        });
        const requestUrl = this.getRequestUrl();

        fetch(requestUrl)
            .then(response => response.json())
            .then(blogViewModel => {
                this.setState({
                    viewModel: blogViewModel,
                    isLoading: false
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

    onChange(filter) {
        const { name, values } = filter;
        this.setState(
            {
                categoryFilter: values,
                activePage: 1
            },
            this.getBlogEntries
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
                            />
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default StructureContentList;
