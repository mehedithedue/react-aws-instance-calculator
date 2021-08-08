import React, {Component} from "react";
import PropTypes from "prop-types";
import generalConfiguration from '../../configurations/storageOptimizedConfiguration.json';
import BaseConfiguration from "./BaseConfiguration";

class StorageOptimizedConfiguration extends Component {

    configuration = generalConfiguration;

    handleSelected = (value) => {
        this.props.handleChangeInstanceType(value);
        this.props.handleChangedConfiguration('general');
        this.props.handleChangedConfig(this.configuration[value]);
    }

    render() {

        return (
            <BaseConfiguration
                handleSelected={this.handleSelected}
                active={this.props.active}
                configuration={this.configuration}
                instanceType={this.props.instanceType}
                placeholder={`Storage Optimized`}
            />
        );
    }
}

StorageOptimizedConfiguration.propTypes = {
    active: PropTypes.bool.isRequired,
    instanceType: PropTypes.string.isRequired,
    handleChangeInstanceType: PropTypes.func.isRequired,
    handleChangedConfiguration: PropTypes.func.isRequired,
    handleChangedConfig: PropTypes.func.isRequired,
};

export default StorageOptimizedConfiguration;
