import React, { Component } from 'react';
import BlogCardList from './Blog/BlogCardList';
import Pagination from 'react-paginate';
import FilterContainer from './FilterContainer/FilterContainer';
import Loader from './Loader/Loader';
import './App.css'

class StructureContentList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewModel: {
                Results: {
                    Contents: [],
                }
			},
			activePage: 1,
			categories: [
				{
					name: 'All Blog Posts',
					icon: 'fa-list-ul'
				},
				{
					name: 'Collection and Materials',
					icon: 'fa-book'
				},
				{
					name: 'News',
					icon: 'fa-bullhorn'
				},
				{
					name: 'Programming and Events',
					icon: 'fa-calendar-check-o'
				}
		],
			categoryFilter: null,
			baseUrl: 'http://localhost:54453/api/structured-content/blog',
			isLoading: true,
			hasErrorGettingEntries: false,
			filters: [{
				title: "Category",
				type: 'multiple-select',
				options: [
					{
						label: "Collection and Materials",
						value: "collections-and-materials"
					},
					{
						label: "News",
						value: "news"
					},
					{
						label: "Programming and Events",
						value: "programming-and-events"
					}
				]
			}]
		};

		this.onPageChange = this.onPageChange.bind(this);
		this.onCategorySelection = this.onCategorySelection.bind(this);
	}

	buildQueryString() {
		const { categoryFilter } = this.state;
		const filterQueryString = categoryFilter && categoryFilter.toLowerCase().indexOf('all ') === -1
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
			.then((response) => response.json())
			.then((blogViewModel) => {
				this.setState({
					viewModel: blogViewModel,
					isLoading: false,

				})
			})
			.catch((error) => {
				this.setState({
					hasErrorGettingEntries: true,
					isLoading: false
				});
			});
	}

	getRequestUrl() {
		const queryString = this.buildQueryString();

		return `${this.state.baseUrl}${queryString}`
	}

	onCategorySelection(appliedFilterText) {
		this.setState({
			categoryFilter: appliedFilterText,
			activePage: 1
		}, this.getBlogEntries);
	}

	onPageChange(pageInfo) {
		this.setState({
			activePage: pageInfo.selected + 1 // 0 based
		}, this.getBlogEntries);
	}

    render() {
		const { TotalPages, Results } = this.state.viewModel;
		const defaultButtonClasses = "btn btn-default";
        return (
            <div className="Blog">
				<FilterContainer
					title="Blog Filters"
					filters={this.state.filters} />
                <BlogCardList
                    contentItems={Results.Contents} />
				{this.state.isLoading && <Loader /> }
				{this.state.hasErrorGettingEntries &&
					<p>There was a problem retrieving our Between the Covers posts. Please try again in a few minutes.</p>}
				{TotalPages && <Pagination
					previousLabel={"Previous"}
					nextLabel={"Next"}
					breakLabel={<a href="">...</a>}
					breakClassName={"break-me"}
					pageCount={TotalPages}
					marginPagesDisplayed={2}
					pageRangeDisplayed={5}
					onPageChange={this.onPageChange}
					containerClassName={"pager"}
					subContainerClassName={"pages pagination"}
					pageLinkClassName={defaultButtonClasses}
					previousLinkClassName={defaultButtonClasses}
					nextLinkClassName={defaultButtonClasses}
					activeClassName={"active"} />
				}
            </div>
        );
    }
}

export default StructureContentList;
