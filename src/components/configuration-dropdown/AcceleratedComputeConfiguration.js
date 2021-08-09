import React, {Component} from "react";
import PropTypes from "prop-types";
import configuration from "../../configurations/initialCpuAndMemoryConfiguration.json"
import BaseConfiguration from "./BaseConfiguration";

class AcceleratedComputeConfiguration extends Component {

    name = this.props.name;

    configuration = configuration.acceleratedComputeConfiguration;

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

AcceleratedComputeConfiguration.propTypes = {
    instanceFamily: PropTypes.string.isRequired,
    handleChangedConfig: PropTypes.func.isRequired,
};

export default AcceleratedComputeConfiguration;