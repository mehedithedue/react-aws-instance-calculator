import React, {Component} from "react";
import PropTypes from "prop-types";
import computeOptimizedConfiguration from '../../configurations/computeOptimizedConfiguration.json'
import BaseConfiguration from "./BaseConfiguration";

class ComputeOptimizedConfiguration extends Component {

    configuration = computeOptimizedConfiguration;

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
                placeholder={`Compute Optimized`}
            />
        );
    }
}

ComputeOptimizedConfiguration.propTypes = {
    active: PropTypes.bool.isRequired,
    instanceType: PropTypes.string.isRequired,
    handleChangeInstanceType: PropTypes.func.isRequired,
    handleChangedConfiguration: PropTypes.func.isRequired,
    handleChangedConfig: PropTypes.func.isRequired,
};

export default ComputeOptimizedConfiguration;
