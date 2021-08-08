import React, {Component} from "react";
import PropTypes from "prop-types";
import DisplayChild from "./DisplayChild";
import {priceCalculationAWS} from "../utils/priceCalculatorEngineAWS";

class AWSCostDisplay extends Component {
    constructor(props) {
        super(props)
        this.state = {price: 0, description: null}
    }

    componentDidMount = () => this.callApiAndLoadDataFromAWS(this.props)
    componentWillReceiveProps = (nextProps) => this.callApiAndLoadDataFromAWS(nextProps)

    async callApiAndLoadDataFromAWS(props){
        const {price, description} = await priceCalculationAWS(props);
        this.setState({price: price})
        this.setState({description: description});
    }

    render() {
        return (
            <div className="flex-cost">
                <DisplayChild func={(<p>${this.state.price}</p>)} text={`AWS Cost: ${this.state.description}`}/>
            </div>
        );
    }
}

AWSCostDisplay.propTypes = {
    cpu: PropTypes.number.isRequired,
    memory: PropTypes.number.isRequired,
    storage: PropTypes.number.isRequired,
    storagePriceGBPerMonth: PropTypes.number.isRequired
};

export default AWSCostDisplay;
