import React, {Component} from "react";
import PropTypes from "prop-types";
import memoryOptimizedConfiguration from "../../configurations/memoryOptimizedConfiguration.json";
import BaseConfiguration from "./BaseConfiguration";

class MemoryOptimizedConfiguration extends Component {

    configuration = memoryOptimizedConfiguration;

    handleSelected = (value) => {
        this.props.handleChangeInstanceType(value);
        this.props.handleChangedConfiguration('compute');
        this.props.handleChangedConfig(this.configuration[value]);
    }

    render() {
        return (
            <BaseConfiguration
                handleSelected={this.handleSelected}
                active={this.props.active}
                configuration={this.configuration}
                instanceType={this.props.instanceType}
                placeholder={`Memory Optimized`}
            />
        );
    }
}

MemoryOptimizedConfiguration.propTypes = {
    active: PropTypes.bool.isRequired,
    instanceType: PropTypes.string.isRequired,
    handleChangeInstanceType: PropTypes.func.isRequired,
    handleChangedConfiguration: PropTypes.func.isRequired,
    handleChangedConfig: PropTypes.func.isRequired,
};

export default MemoryOptimizedConfiguration;
