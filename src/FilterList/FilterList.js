import React from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonGroup } from 'react-bootstrap';
import './FilterList.css';

const propTypes = {
	filterList: PropTypes.array.isRequired,
	onChange: PropTypes.func.isRequired
};

const defaultProps = {};

export default class FilterList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			activeFilter: null
		};

		this.onButtonClick = this.onButtonClick.bind(this);
		this.isActive = this.isActive.bind(this);
	}

	isActive(item) {
		return this.state.activeFilter === item.name;
	}

	onButtonClick(clickEvent) {
		const { currentTarget } = clickEvent;

		this.setState({
			activeFilter: currentTarget.textContent.trim()
		}, () => {
			this.props.onChange(this.state.activeFilter);
		});
	}

	render() {
		return (
			<React.Fragment>
				<ButtonGroup className="filter-group">
					{this.props.filterList.map((item, itemIndex) =>
						<h4>
						<Button
							key={itemIndex}
							onClick={this.onButtonClick}
							active={this.isActive(item)}>
						{item.icon &&
							<i className={`fa fa-icon ${item.icon}`}></i>} {item.name}</Button>)</h4>}
				</ButtonGroup>
			</React.Fragment>
		);
	}
}

 FilterList.propTypes = propTypes;
 FilterList.defaultProps = defaultProps;