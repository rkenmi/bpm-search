import {FILTER, FILTER_RESPONSE} from "./types";

export const filterByBPM = (minBPM, maxBPM) => {
  return {
    type: FILTER,
    payload: {
      minBPM,
      maxBPM
    },
  }
};

export const filteredBPMResponse = (results) => {
  return {
    type: FILTER_RESPONSE,
    results
  }
};
