import React, {Component} from "react";
import InputRange from "react-input-range";
import Display from "./Display";
import DisplayConfig from "./DisplayConfig";
import "../styles/Calculator.css";
import "react-input-range/lib/css/index.css";
import AWSCostDisplay from "./AWSCostDisplay";
import GeneralPurposeConfiguration from "./configuration-dropdown/GeneralPurposeConfiguration";
import MemoryOptimizedConfiguration from "./configuration-dropdown/MemoryOptimizedConfiguration";
import AcceleratedComputeConfiguration from "./configuration-dropdown/AcceleratedComputeConfiguration";
import ComputeOptimizedConfiguration from "./configuration-dropdown/ComputeOptimizedConfiguration";
import StorageOptimizedConfiguration from "./configuration-dropdown/StorageOptimizedConfiguration";
import StorageHeadingAndOptionsDisplay from "./StorageHeadingAndOptionsDisplay";
import storageOptionsConfiguration from "../configurations/storageOptionsConfiguration.json";

class Calculator extends Component {
    state = {
        storageValue: 0,
        transferValue: 1,
        cpuValue: 0,
        memoryValue: 0.5,
        configCpuValues: [2, 2, 2, 2, 2, 4, 8],
        configMemoryValues: [0.5, 1, 2, 4, 8, 16, 32],
        configTitles: ["t4g.nano", "t4g.micro", "t4g.small", "t4g.medium", "t4g.large", "t4g.xlarge", "t4g.2xlarge"],
        instanceType: 'T4g',
        configuration: 'general',
        storagePriceGBPerMonth: 0.088,
        storageTypeEBSVolume : "storage.gp3"

    };

    storageTypeOptions = storageOptionsConfiguration;

    storageValueChange = value => {
        this.setState({storageValue: value});
    };
    handleCpuChange = value => {
        this.setState({cpuValue: value});
    };
    handleInstanceTypeSelected = value => {
        this.setState({instanceType: value});
        this.setState({cpuValue: 0});
    };

    handleConfigurationChanged = value => {
        this.setState({configuration: value});
    };
    handleChangedConfig = value => {
        this.setState({configTitles: value['title']});
        this.setState({configCpuValues: value['vcpu']});
        this.setState({configMemoryValues: value['memory']});
    };
    handleStoragePriceGBPerMonthChange = value => {
        this.setState({storagePriceGBPerMonth: parseFloat(value)});
    };
    handleStorageTypeEBSVolumeChange = value => {
        let storeObject = this.storageTypeOptions.find( (store => store.value === value));
        storeObject && storeObject.price && this.handleStoragePriceGBPerMonthChange(storeObject.price);
        this.setState({storageTypeEBSVolume: value});
        this.storageValueChange(0);
    };
    componentDidMount() {}
    componentDidUpdate() {}

    render() {
        const {
            storageValue,
            transferValue,
            cpuValue,
            configCpuValues,
            configMemoryValues,
            configTitles,
            storagePriceGBPerMonth
        } = this.state;
        return (
            <div className="App">
                <div className="configuration-select">
                    <GeneralPurposeConfiguration
                        active={this.state.configuration  === 'general'}
                        handleChangeInstanceType={this.handleInstanceTypeSelected}
                        handleChangedConfiguration={this.handleConfigurationChanged}
                        handleChangedConfig={this.handleChangedConfig}
                        instanceType={this.state.instanceType}
                    />
                    <AcceleratedComputeConfiguration
                        active={this.state.configuration  === 'accelerated'}
                        handleChangeInstanceType={this.handleInstanceTypeSelected}
                        handleChangedConfiguration={this.handleConfigurationChanged}
                        handleChangedConfig={this.handleChangedConfig}
                        instanceType={this.state.instanceType}
                    />
                    <MemoryOptimizedConfiguration
                        active={this.state.configuration  === 'memory'}
                        handleChangeInstanceType={this.handleInstanceTypeSelected}
                        handleChangedConfiguration={this.handleConfigurationChanged}
                        handleChangedConfig={this.handleChangedConfig}
                        instanceType={this.state.instanceType}
                    />
                    <StorageOptimizedConfiguration
                        active={this.state.configuration  === 'compute'}
                        handleChangeInstanceType={this.handleInstanceTypeSelected}
                        handleChangedConfiguration={this.handleConfigurationChanged}
                        handleChangedConfig={this.handleChangedConfig}
                        instanceType={this.state.instanceType}
                    />
                    <ComputeOptimizedConfiguration
                        active={this.state.configuration  === 'compute'}
                        handleChangeInstanceType={this.handleInstanceTypeSelected}
                        handleChangedConfiguration={this.handleConfigurationChanged}
                        handleChangedConfig={this.handleChangedConfig}
                        instanceType={this.state.instanceType}
                    />
                </div>
                <h4 style={{textTransform:"uppercase"}}>
                    Configuration: {configTitles[cpuValue].replace(/([A-Za-z0-9].+\.)/g, '')}
                </h4>
                <InputRange
                    step={1}
                    maxValue={this.state.configCpuValues.length - 1}
                    minValue={0}
                    value={cpuValue}
                    onChange={this.handleCpuChange}
                />
                <DisplayConfig cpu={configCpuValues[cpuValue]} memory={configMemoryValues[cpuValue]}/>
                <StorageHeadingAndOptionsDisplay
                    storageValue={this.state.storageValue}
                    storageTypeEBSVolume={this.state.storageTypeEBSVolume}
                    handleSelected={this.handleStorageTypeEBSVolumeChange}
                />
                <InputRange
                    step={1}
                    maxValue={10}
                    minValue={0}
                    value={storageValue}
                    onChange={this.storageValueChange}
                />
                <AWSCostDisplay cpu={configCpuValues[cpuValue]}
                                memory={configMemoryValues[cpuValue]}
                                instanceType={configTitles[cpuValue]}
                                storage={storageValue}
                                storagePriceGBPerMonth={storagePriceGBPerMonth}
                />
            </div>
        );
    }
}

export default Calculator;
