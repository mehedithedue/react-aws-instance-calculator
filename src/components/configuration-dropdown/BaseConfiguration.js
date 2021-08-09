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
                {this.props.name}
            </button>
        );
    }
}

BaseConfiguration.propTypes = {
    active: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    handleSelected: PropTypes.func.isRequired,
};

export default BaseConfiguration;
