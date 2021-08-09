import React, {Component} from "react";
import PropTypes from "prop-types";
import BaseConfiguration from "./BaseConfiguration";
import configuration from "../../configurations/initialCpuAndMemoryConfiguration.json"

class GeneralPurposeConfiguration extends Component {

    name = this.props.name;

    configuration = configuration.generalPurposeConfiguration;

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

GeneralPurposeConfiguration.propTypes = {
    instanceFamily: PropTypes.string.isRequired,
    handleChangedConfig: PropTypes.func.isRequired,
};

export default GeneralPurposeConfiguration;
