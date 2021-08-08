
import React, { Component } from "react";
import PropTypes from "prop-types";
import DisplayChild from "./DisplayChild";

class DisplayConfig extends Component {
  state = {
    APR: 0.05
  };

  cpuUsage = () => {
    const { cpu } = this.props;
    return <p>{cpu}</p>;
  };
  memoryRequired = () => {
    const { memory } = this.props;
    return <p>{memory}</p>;
  };

  render() {
    return (
      <div className="flex">
        <DisplayChild func={this.cpuUsage()} text="CPUs" />
        <DisplayChild
          func={this.memoryRequired()}
          text="Memory (GiB)"
        />
      </div>
    );
  }
}

DisplayConfig.propTypes = {
  cpu: PropTypes.number.isRequired,
  memory: PropTypes.number.isRequired
};

export default DisplayConfig;
