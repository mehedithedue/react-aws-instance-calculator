import React, {Component} from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import {extractNameFromConfiguration} from "../../utils/extractFromJson";
import {convertArrayToSelectOption} from "../../helper/helper";

class BaseConfiguration extends Component {

    configuration = this.props.configuration;

    getConfigurationOption(configurations) {
        let extractedConfigurationNames = extractNameFromConfiguration(configurations)
        return convertArrayToSelectOption(extractedConfigurationNames)
    }

    render() {

        const configurationOption = this.getConfigurationOption(this.configuration);

        return (
            <div className={`select-option ${this.props.active ? 'active' : ''}`}>
                <Select
                    classNamePrefix="react-select"
                    options={configurationOption}
                    onChange={(selected) =>
                        this.props.handleSelected((selected && selected.value) || '')
                    }
                    value={configurationOption.filter(option => option.value === this.props.instanceType)}
                    isClearable={true}
                    placeholder={this.props.placeholder}
                />
            </div>
        );
    }
}

BaseConfiguration.propTypes = {
    active: PropTypes.bool.isRequired,
    configuration: PropTypes.object.isRequired,
};

export default BaseConfiguration;
