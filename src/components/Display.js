import React, { Component } from "react";
import PropTypes from "prop-types";
import DisplayChild from "./DisplayChild";

class Display extends Component {
  state = {
    APR: 0.05
  };


  totalCost = () => {
    const { storage, transfer,cpu,memory } = this.props;
    const finalAnswer =storage+transfer+cpu+memory;
    return <p>${finalAnswer}</p>;
  };


  render() {
    return (
      <div className="flex-cost">
        <DisplayChild func={this.totalCost()} text="Total Cost" />
      </div>
    );
  }
}

Display.propTypes = {
  storage: PropTypes.number.isRequired,
  transfer: PropTypes.number.isRequired,
  cpu: PropTypes.number.isRequired,
  memory: PropTypes.number.isRequired
};

export default Display;
