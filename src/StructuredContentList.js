import React, { Component } from "react";
import PropTypes from "prop-types";
import CardList from "./Card/CardList";
import FilterContainer from "./FilterContainer/FilterContainer";
import LoadMore from "./LoadMore/LoadMore";
import { Card, Loader } from "baltimorecounty-react-components";
import "./App.css";
import { BuildFilterExpression, Operators } from "./Utils/ApiHelper";
import BlogCardSkeleton from "./Blog/BlogCardSkeleton";
import FilterSkeleton from "./FilterContainer/FilterSkeleton";
import FilterInformation from "./FilterInformation/FilterInformation";

const propTypes = {
  title: PropTypes.string
};

const defaultProps = {
  title: ""
};

class StructureContentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewModel: {
        Results: {
          Contents: []
        }
	  },
      featuredBlogEntry: null,
      blogEntries: [],
      activePage: 1,
      totalRecordsShown: 0,
      activeFilters: {},
      baseUrl: this.props.baseUrl,
      isLoading: true,
      isInitialized: false,
      isLoadMoreDisabled: false,
      shouldLoadMoreBeVisible: true,
      hasErrorGettingEntries: false,
      filters: this.props.filters
        ? this.props.filters.map(filter => {
          filter.options = []; // ensure options
          return filter;
        })
        : []
    };

    this.onChange = this.onChange.bind(this);
    this.getFilterOptions = this.getFilterOptions.bind(this);
    this.getActiveFilters = this.getActiveFilters.bind(this);
    this.getAppliedFiltersQuery = this.getAppliedFiltersQuery.bind(this);
    this.onLoadMore = this.onLoadMore.bind(this);
  }

  buildFilterQueryString() {
    const activeFilters = this.getActiveFilters();
    const appliedFilterQuery = this.getAppliedFiltersQuery();
    let queryParams = [];

    if (activeFilters) {
      queryParams.push(`filters=${activeFilters}`);
    }
    if (appliedFilterQuery) {
      queryParams.push(`$filter=${appliedFilterQuery}`);
    }
    return queryParams.join("&");
  }

  buildQueryString() {
    const queryString = this.buildFilterQueryString();
    const activePage = this.state.activePage;
    return queryString
      ? `?page=${activePage}&${queryString}`
      : `?page=${activePage}`;
  }

  componentDidMount() {
    this.getBlogEntries(() => {
      this.setState({
        isInitialized: true
      });
    });
  }

  getActiveFilters() {
    // filters are the distinct fields being returned, if there are some in the app, these should always be added to the query string
    return this.state.filters.map(filter => filter.field);
  }

  getFeaturedBlogEntry(blogEntries) {
    return blogEntries.find(entry => entry.IsFeatured);
  }

  getSortedBlogEntries(featuredEntry, blogEntries) {
    if (featuredEntry) {
      let restElements = blogEntries.filter((i) => i.Id !== featuredEntry.Id);
      return [featuredEntry, ...restElements];
    }
    return blogEntries;
  }

  getAppliedFilterList() {
    const appliedFilters = { ...this.state.activeFilters };
    return Object.keys(appliedFilters).map(appliedFilterKey => ({
      key: appliedFilterKey,
      value: appliedFilters[appliedFilterKey]
    }));
  }

  getAppliedFiltersQuery() {
    const appliedFilterList = this.getAppliedFilterList();
    if (appliedFilterList.length) {
      const filterExpressions = appliedFilterList.map(filter => {
        const filterValue = filter.value[0];
        if (filterValue && filterValue.toLowerCase() !== "all") {
          return BuildFilterExpression(
            filter.key,
            Operators.Equal,
            filter.value[0]
          );

        }
        return null;
      });
      return `${filterExpressions.join(` ${Operators.And} `)}`;
    }
    return "";
  }

  isFeaturedCategorySelected(activeFilters, category) {
	return Object.keys(activeFilters).length === 0 || Object.prototype.hasOwnProperty.call(activeFilters, 'Category') &&
	(activeFilters.Category.indexOf(category) > -1 || activeFilters.Category.filter(filter => !!filter).length === 0);
  }

  getBlogEntries(callback) {
    this.setState(
      {
        isLoading: true
      },
      () => {
        const requestUrl = this.getRequestUrl();

        fetch(requestUrl)
          .then(response => response.json())
          .then(contentViewModel => {
			const { activeFilters, activePage, blogEntries, featuredBlogEntry} = this.state;
            const updatedBlogEntries = blogEntries
              .slice()
              .concat(contentViewModel.Results.Contents);
            const shouldLoadMoreBeVisible = !(
              contentViewModel.TotalRecords === updatedBlogEntries.length
			);
			const updatedFeaturedBlogEntry = featuredBlogEntry || this.getFeaturedBlogEntry(updatedBlogEntries);
			const sortedBlogEntries = this.isFeaturedCategorySelected(activeFilters, updatedFeaturedBlogEntry.Category)
				? this.getSortedBlogEntries(updatedFeaturedBlogEntry, updatedBlogEntries)
				: updatedBlogEntries;
			const filters = this.getFilterOptions(contentViewModel.FilterValues);
			const totalRecordsShown = activePage * contentViewModel.PageSize;

            this.setState(
              {
                isLoading: false,
                viewModel: contentViewModel,
                blogEntries: sortedBlogEntries,
                featuredBlogEntry: updatedFeaturedBlogEntry,
                filters,
                totalRecordsShown,
                shouldLoadMoreBeVisible
              },
              callback
            );
          })
          .catch(error => {
			  console.log(error)
            this.setState(
              {
                hasErrorGettingEntries: true,
                isLoading: false
              },
              callback
            );
          });
      }
    );
  }

  getRequestUrl() {
    const queryString = this.buildQueryString();

    return `${this.state.baseUrl}${queryString}`;
  }

  getFilterOptions(filterValues) {
    return this.state.filters.map(filter => {
      filter.options = filterValues[filter.field];
      if (filter.type === "radio") {
        filter.options.unshift({
          label: "Show All",
          value: "all"
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
        activePage: 1,
        blogEntries: []
      },
      () => {
        this.getBlogEntries();
      }
    );
  }

  onLoadMore() {
    this.setState(
      {
        activePage: this.state.activePage + 1,
        isLoadMoreDisabled: true
      },
      () => {
        this.getBlogEntries(() => {
          this.setState({
            isLoadMoreDisabled: false
          });
        });
      }
    );
  }

  render() {
    const {
      blogEntries,
      hasErrorGettingEntries,
      isInitialized,
      isLoading,
      isLoadMoreDisabled,
      filters,
      shouldLoadMoreBeVisible,
      totalRecordsShown,
      viewModel
    } = this.state;
    const { cardContentComponent, title } = this.props;
    const shouldShowFilterSkeleton =
      (isLoading && !isInitialized) || hasErrorGettingEntries;
    const shouldShowFilters =
      (!isLoading || isInitialized) && !hasErrorGettingEntries;
    const shouldShowCardSkeleton = isLoading && !isLoadMoreDisabled;
    const shouldShowCardList = !isLoading || blogEntries.length > 0;
    const shouldShowLoadMore =
      viewModel.TotalPages && !isLoading && shouldLoadMoreBeVisible;

    return (
      <div className="Blog container wrapper">
        <div className="filters">
          {shouldShowFilterSkeleton && <FilterSkeleton />}
          {shouldShowFilters && (
            <FilterContainer
              title="Blog Filters"
              filters={filters}
              onChange={this.onChange}
            />
          )}
        </div>
        <header>{title && <h1>{title}</h1>}</header>
        <div className="cards filter-cards" style={{ position: "relative" }}>
          {shouldShowCardSkeleton &&
            new Array(10)
              .fill()
              .map((item, itemIndex) => <BlogCardSkeleton key={itemIndex} />)}
          {shouldShowCardList && (
            <CardList
              contentType="blog"
              contentItems={blogEntries}
              cardContentComponent={cardContentComponent}
            />
          )}
          {isLoading && <Loader />}
          {hasErrorGettingEntries && (
            <Card>
              <p>
                <em>
                  There was a problem retrieving our Between the Covers posts.
                  Please try again in a few minutes.
                </em>
              </p>
            </Card>
          )}
          {!isLoading && blogEntries.length > 0 && (
            <FilterInformation
              totalRecordsShown={totalRecordsShown}
              totalRecords={viewModel.TotalRecords}
            />
          )}
          {shouldShowLoadMore && (
            <LoadMore
              disabled={isLoadMoreDisabled}
              onSelect={this.onLoadMore}
            />
          )}
        </div>
      </div>
    );
  }
}

export default StructureContentList;

StructureContentList.propTypes = propTypes;
StructureContentList.defaultProps = defaultProps;
