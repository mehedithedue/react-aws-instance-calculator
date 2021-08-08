import React, {Component} from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import storageOptionsConfiguration from "../configurations/storageOptionsConfiguration.json"

class StorageHeadingAndOptionsDisplay extends Component {

    configurationOptions = storageOptionsConfiguration;

    render() {

        return (
            <div className="storage-block">
                <div className="header">
                    <h4>{`Storage ${this.props.storageValue} TB`}</h4>
                </div>
                <div className="storage-options">
                    <div className={`select-option`}>
                        <Select
                            classNamePrefix="react-select"
                            options={this.configurationOptions}
                            onChange={(selected) =>
                                this.props.handleSelected((selected && selected.value) || '')
                            }
                            value={this.configurationOptions.filter(option => option.value === this.props.storageTypeEBSVolume)}
                            isClearable={true}
                            placeholder={this.props.placeholder}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

StorageHeadingAndOptionsDisplay.propTypes = {
    storageTypeEBSVolume: PropTypes.string.isRequired,
    storageValue: PropTypes.number.isRequired,
};

export default StorageHeadingAndOptionsDisplay;
