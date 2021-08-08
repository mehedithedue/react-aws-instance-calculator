import React, {Component} from "react";
import PropTypes from "prop-types";
import acceleratedConfiguration from '../../configurations/acceleratedConfiguration.json'
import BaseConfiguration from "./BaseConfiguration";

class AcceleratedComputeConfiguration extends Component {

    configuration = acceleratedConfiguration;

    handleSelected = (value) => {
        this.props.handleChangeInstanceType(value);
        this.props.handleChangedConfiguration('accelerated');
        this.props.handleChangedConfig(this.configuration[value]);
    }

    render() {

        return (
            <BaseConfiguration
                handleSelected={this.handleSelected}
                active={this.props.active}
                configuration={this.configuration}
                instanceType={this.props.instanceType}
                placeholder={`Accelerated Compute`}
            />
        );
    }
}

AcceleratedComputeConfiguration.propTypes = {
    active: PropTypes.bool.isRequired,
    instanceType: PropTypes.string.isRequired,
    handleChangeInstanceType: PropTypes.func.isRequired,
    handleChangedConfiguration: PropTypes.func.isRequired,
    handleChangedConfig: PropTypes.func.isRequired,
};

export default AcceleratedComputeConfiguration;
