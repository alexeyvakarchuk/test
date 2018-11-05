// @flow

import React, { PureComponent } from "react";
import { connect } from "react-redux";
import store from "store";
import type { Props, State } from "./types";
import Select from "react-select";
import ClassesCard from "components/FlightCard";

class FlightsList extends PureComponent<Props, State> {
  state = {
    filterDestination: null
  };

  handleInputChange = ({ value }) => {
    this.setState({ filterDestination: value });
  };

  render() {
    const { flightsList } = this.props;

    const filteredOptions = flightsList.map(el => el.to);

    const selectOptions = filteredOptions
      .filter((item, pos) => filteredOptions.indexOf(item) == pos)
      .map(el => ({
        value: el,
        label: el
      }));

    return [
      <div className="filters" key="filters">
        {flightsList.length && (
          <Select
            className="filters__select"
            classNamePrefix="react-select"
            onChange={this.handleInputChange}
            options={selectOptions}
          />
        )}
      </div>,
      <section className="flightsList" key="data">
        {flightsList.length ? (
          flightsList
            .filter(
              el =>
                this.state.filterDestination === null ||
                el.to === this.state.filterDestination
            )
            .map(el => <ClassesCard data={el} />)
        ) : (
          <div className="flightsList__empty">
            There're no available flights
          </div>
        )}
      </section>
    ];
  }
}

export default connect(({ flightsList: { data } }) => ({
  flightsList: data
}))(FlightsList);
