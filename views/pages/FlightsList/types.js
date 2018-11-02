// @flow

import type { FlightType } from "ducks/flightsList/types";

export type Props = {
  flightsList: FlightType[]
};

export type State = {
  filterDestination: null | string
};
