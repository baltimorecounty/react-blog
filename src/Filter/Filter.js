import React from 'react';
import PropTypes from 'prop-types';
import MultipleSelectFilter from './MultipleSelectFilter';
import './Filter.css';
import { SlideDown } from 'react-slidedown';
import 'react-slidedown/lib/slidedown.css';

const propTypes = {
    onChange: PropTypes.func,
    filter: PropTypes.object.isRequired
};

export default class Filter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isExpanded: true,
            selectedFilters: []
        };

        this.toggleFilter = this.toggleFilter.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.updateFilters = this.updateFilters.bind(this);
    }

    handleChange(filters) {
        const { isSelected, value } = filters;
        let selectedFilters =
            this.props.filter.type === 'single'
                ? (selectedFilters = [value])
                : isSelected
                    ? [...this.state.selectedFilters, value]
                    : this.state.selectedFilters.filter(
                          filter => filter !== value
                      );

        this.updateFilters(selectedFilters);
    }

    toggleFilter() {
        this.setState({
            isExpanded: !this.state.isExpanded
        });
    }

    updateFilters(selectedFilters) {
        this.setState(
            {
                selectedFilters
            },
            () => {
                this.props.onChange({
                    name: this.props.title,
                    values: this.state.selectedFilters
                });
            }
        );
    }

    render() {
        const { options, title, type } = this.props.filter;
        const toggleClass = this.state.isExpanded
            ? 'minus-square'
            : 'plus-square';

        return (
            <div className="filter-list-container">
                <h4 className="filter-toggle" onClick={this.toggleFilter}>
                    <span>{title}</span>
                    <i className={`fa fa-${toggleClass}`} aria-hidden="true" />
                </h4>
                <SlideDown
                    className={'filter-dropdown'}
                    closed={!this.state.isExpanded}
                >
                    <MultipleSelectFilter
                        onChange={this.handleChange}
                        options={options}
                        title={title}
                        type={type}
                    />
                </SlideDown>
            </div>
        );
    }
}

Filter.propTypes = propTypes;
