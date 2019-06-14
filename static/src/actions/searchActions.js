import {FILTER, FILTER_RESPONSE} from "./types";

export const filterByBPM = (minBPM, maxBPM, page, genres) => {
  return {
    type: FILTER,
    payload: {
      minBPM,
      maxBPM,
      page,
      genres,
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
