import React, {Component} from "react";
import PropTypes from "prop-types";
import BaseConfiguration from "./BaseConfiguration";
import configuration from "../../configurations/initialCpuAndMemoryConfiguration.json"

class ComputeOptimizedConfiguration extends Component {

    name = this.props.name;

    configuration = configuration.computeOptimizedConfiguration;

    handleSelected = (value) => {
        this.props.handleChangedConfig(value, this.configuration);
    }

    render() {
        return (
            <BaseConfiguration
                handleSelected={this.handleSelected}
                active={this.props.instanceFamily === this.name}
                name={this.name}
            />
        );
    }
}

ComputeOptimizedConfiguration.propTypes = {
    instanceFamily: PropTypes.string.isRequired,
    handleChangedConfig: PropTypes.func.isRequired,
};

export default ComputeOptimizedConfiguration;