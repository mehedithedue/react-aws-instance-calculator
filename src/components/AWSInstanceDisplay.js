import React, {Component} from "react";
import PropTypes from "prop-types";
import DisplayChild from "./DisplayChild";

class AWSInstanceDisplay extends Component {
    constructor(props) {
        super(props)
        this.state = {products: [{name: undefined}]}
    }

    componentDidMount = () => this.getfilterDataWithPrice(this.props)
    componentWillReceiveProps = (nextProps) => this.getfilterDataWithPrice(nextProps)

    async getfilterDataWithPrice(props) {
        let products = props.awsResponseWithPrice.filter(product => product.price === props.price && product.price != 0)
        this.setState({products: products})
    }

    render() {
        return (
            <div className="flex-cost">
                {this.state.products.map((product, index) => (
                    (product.name && <DisplayChild key={index} func={(
                        <span>
                            <p>${product.price}/{product.unit}</p>
                            {product.name}<br/>
                        </span>)} text={`Cost: ${product.description}`}/>)
                ))}
                {this.state.products.length === 0 &&
                <DisplayChild func={(<p>No Instance</p>)} text={`Please try to search in other configuration`}/>}
            </div>
        );
    }
}

AWSInstanceDisplay.propTypes = {
    awsResponseWithPrice: PropTypes.array.isRequired,
    price: PropTypes.number.isRequired,
};

export default AWSInstanceDisplay;
