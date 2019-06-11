import {FILTER, FILTER_RESPONSE} from "./types";

export const filterByBPM = (minBPM, maxBPM, page) => {
  return {
    type: FILTER,
    payload: {
      minBPM,
      maxBPM,
      page
    },
  }
};

export const filteredBPMResponse = (results, totalPages) => {
  return {
    type: FILTER_RESPONSE,
    results,
    totalPages
  }
};
