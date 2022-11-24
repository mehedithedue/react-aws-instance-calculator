import React, {Component} from "react";
import PropTypes from "prop-types";

class BaseConfiguration extends Component {

    handleClicked = (e) => {
        e.preventDefault();
        this.props.handleSelected(this.props.name)
    }

    render() {

        return (
            <button className={this.props.active ? 'active' : ''}
                    onClick={this.handleClicked}>
                {this.props.label}
            </button>
        );
    }
}

BaseConfiguration.propTypes = {
    active: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    handleSelected: PropTypes.func.isRequired,
};

export default BaseConfiguration;
