import React, {Component} from "react";
import PropTypes from "prop-types";
import generalConfiguration from '../../configurations/generalConfiguration.json'
import BaseConfiguration from "./BaseConfiguration";

class GeneralPurposeConfiguration extends Component {

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
                placeholder={`General Purpose`}
            />
        );
    }
}

GeneralPurposeConfiguration.propTypes = {
    active: PropTypes.bool.isRequired,
    instanceType: PropTypes.string.isRequired,
    handleChangeInstanceType: PropTypes.func.isRequired,
    handleChangedConfiguration: PropTypes.func.isRequired,
    handleChangedConfig: PropTypes.func.isRequired,
};

export default GeneralPurposeConfiguration;
