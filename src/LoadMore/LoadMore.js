import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    buttonText: PropTypes.string,
    disabled: PropTypes.bool,
    onSelect: PropTypes.func
};

const defaultProps = {
    buttonText: 'Load More',
    disabled: false,
    onSelect: () => {}
};

export default class LoadMore extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.onSelect();
    }

    render() {
        const defaultButtonClasses = 'btn btn-primary';
        const { buttonText, disabled } = this.props;
        return (
            <React.Fragment>
                <button
                    onClick={this.handleClick}
                    className={defaultButtonClasses}
                    style={{ margin: '20px auto' }}
                    disabled={disabled}
                    type="button"
                >
                    {buttonText}
                </button>
            </React.Fragment>
        );
    }
}

LoadMore.propTypes = propTypes;
LoadMore.defaultProps = defaultProps;
