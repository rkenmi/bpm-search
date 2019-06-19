import {FILTER, FILTER_RESPONSE, GET_GENRES, GET_GENRES_RESPONSE} from "./types";

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

export const filteredBPMResponse = (results, totalPages, timeDiffMs) => {
  return {
    type: FILTER_RESPONSE,
    results,
    totalPages,
    timeDiffMs
  }
};

export const getGenres = () => {
  return {
    type: GET_GENRES,
  }
};

export const getGenresResponse = (results) => {
  return {
    type: GET_GENRES_RESPONSE,
    results,
  }
};
