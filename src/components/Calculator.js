import React, {Component} from "react";
import InputRange from "react-input-range";
import DisplayConfig from "./DisplayConfig";
import "../styles/Calculator.css";
import "react-input-range/lib/css/index.css";
import GeneralPurposeConfiguration from "./configuration-dropdown/GeneralPurposeConfiguration";
import MemoryOptimizedConfiguration from "./configuration-dropdown/MemoryOptimizedConfiguration";
import AcceleratedComputeConfiguration from "./configuration-dropdown/AcceleratedComputeConfiguration";
import ComputeOptimizedConfiguration from "./configuration-dropdown/ComputeOptimizedConfiguration";
import StorageOptimizedConfiguration from "./configuration-dropdown/StorageOptimizedConfiguration";
import storageOptionsConfiguration from "../configurations/storageOptionsConfiguration.json";
import configuration from "../configurations/initialCpuAndMemoryConfiguration.json"
import {getPriceInstanceListFromAWS} from "../utils/priceCalculatorEngineAWS";
import {getSortAndUniqueArray} from "../helper/helper";
import AWSInstanceDisplay from "./AWSInstanceDisplay";

class Calculator extends Component {
    generalConfiguration = configuration.generalPurposeConfiguration;
    storageTypeOptions = storageOptionsConfiguration;
    state = {
        storageValue: 0,
        transferValue: 1,
        cpuValue: this.generalConfiguration.vcpu[0],
        memoryValue: this.generalConfiguration.memory[0],
        cpuMemorySlider: 0,
        configCpuValues: this.generalConfiguration.vcpu,
        configMemoryValues: this.generalConfiguration.memory,
        configTitles: this.generalConfiguration.title,
        instanceType: 'T4g',
        instanceFamily: 'General purpose',
        storagePriceGBPerMonth: 0.088,
        storageTypeEBSVolume: "storage.gp3",
        configPriceValues: [0],
        priceSlider: 0,
        awsResponseWithPrice: []

    };


    storageValueChange = value => {
        this.setState({storageValue: value});
    };
    handlePriceSliderChange = value => {
        value = parseInt(value)
        this.setState({priceSlider: value});
    };
    handleCpuMemorySliderChange = value => {
        value = parseInt(value)
        let vcpu = this.state.configCpuValues[value]
        let memory = this.state.configMemoryValues[value]
        this.setState({cpuMemorySlider: value});
        this.changeCpuValue(vcpu)
        this.changeMemoryValue(memory)

        this.getAwsPriceInstanceByAPI({
            instanceFamily: this.state.instanceFamily,
            vcpu: vcpu,
            memory: memory,
        });
    };

    handleChangedConfig = (value, configuration) => {
        let titleArray = configuration['title'];
        let cpuArray = configuration['vcpu'];
        let memoryArray = configuration['memory'];

        this.setState({instanceFamily: value});
        this.setState({configTitles: titleArray});
        this.setState({configCpuValues: cpuArray});
        this.setState({configMemoryValues: memoryArray});

        this.setState({cpuMemorySlider: 0});
        this.setState({priceSlider: 0});
        cpuArray && this.changeCpuValue(cpuArray[0])
        memoryArray && this.changeMemoryValue(memoryArray[0])
        this.setState({cpuMemorySlider: 0});
        this.changeCpuValue(cpuArray[0])
        this.changeMemoryValue(memoryArray[0])

        this.getAwsPriceInstanceByAPI({
            instanceFamily: value,
            vcpu: cpuArray[0],
            memory: memoryArray[0],
        });
    };
    handleStoragePriceGBPerMonthChange = value => {
        this.setState({storagePriceGBPerMonth: parseFloat(value)});
    };
    handleStorageTypeEBSVolumeChange = value => {
        let storeObject = this.storageTypeOptions.find((store => store.value === value));
        storeObject && storeObject.price && this.handleStoragePriceGBPerMonthChange(storeObject.price);
        this.setState({storageTypeEBSVolume: value});
        this.storageValueChange(0);
    };

    getAwsPriceInstanceByAPI = formParam => {
        getPriceInstanceListFromAWS(formParam).then( data => {
            data.prices && this.setState({configPriceValues: (getSortAndUniqueArray(data.prices))})
            data.result && this.setState({awsResponseWithPrice: data.result})
            this.setState({priceSlider: 0});
        })
    }
    changeCpuValue = (cpuValue) => this.setState({cpuValue: cpuValue});
    changeMemoryValue = (memoryValue) => this.setState({memoryValue: memoryValue});


    componentDidMount() {
        this.getAwsPriceInstanceByAPI({
            instanceFamily: this.state.instanceFamily,
            vcpu: this.generalConfiguration.vcpu[0],
            memory: this.generalConfiguration.memory[0],
        })
    }
    /*
    componentDidUpdate() {}
    */

    render() {
        const {
            cpuValue,
            memoryValue,
            cpuMemorySlider,
            configTitles,
            configPriceValues,
            configCpuValues,
            priceSlider,
            awsResponseWithPrice,
        } = this.state;
        return (
            <div className="App">
                <div className="configuration-select">
                    <GeneralPurposeConfiguration
                        instanceFamily={this.state.instanceFamily}
                        handleChangedConfig={this.handleChangedConfig}
                        name={`General purpose`}
                    />
                    <ComputeOptimizedConfiguration
                        instanceFamily={this.state.instanceFamily}
                        handleChangedConfig={this.handleChangedConfig}
                        name={`Compute optimized`}
                    />
                    <MemoryOptimizedConfiguration
                        instanceFamily={this.state.instanceFamily}
                        handleChangedConfig={this.handleChangedConfig}
                        name={`Memory optimized`}
                    />
                    <AcceleratedComputeConfiguration
                        instanceFamily={this.state.instanceFamily}
                        handleChangedConfig={this.handleChangedConfig}
                        name={`GPU instance`}
                    />

                    <StorageOptimizedConfiguration
                        instanceFamily={this.state.instanceFamily}
                        handleChangedConfig={this.handleChangedConfig}
                        name={`Storage optimized`}
                    />
                </div>
                <h4 style={{textTransform: "uppercase"}}>
                    Configuration
                </h4>
                <InputRange
                    step={1}
                    maxValue={configCpuValues.length - 1}
                    minValue={0}
                    value={cpuMemorySlider}
                    onChange={this.handleCpuMemorySliderChange}
                />
                <DisplayConfig cpu={cpuValue} memory={memoryValue}/>
                <h4 style={{textTransform: "uppercase"}}>
                    Prices : ${configPriceValues[priceSlider]}
                </h4>
                <InputRange
                    step={1}
                    maxValue={configPriceValues.length - 1}
                    minValue={0}
                    value={priceSlider}
                    onChange={this.handlePriceSliderChange}
                    disabled={configPriceValues.length <= 1}
                />
                {/*
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
                */}
                <AWSInstanceDisplay awsResponseWithPrice={awsResponseWithPrice}
                                price={configPriceValues[priceSlider]}
                />
                <small>for more information please visit <a href="https://aws.amazon.com/ec2/instance-types/">https://aws.amazon.com/ec2/instance-types/</a></small>
            </div>
        );
    }
}

export default Calculator;
