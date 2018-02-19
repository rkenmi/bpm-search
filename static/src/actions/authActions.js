import {SET_AUTH_TOKEN} from "./types";

export function setSong(song){
  return {
    type: "NEW_SONG",
    payload: song,
  }
}

export const setAuthToken = (token) => {
  return {
    type: SET_AUTH_TOKEN,
    payload: token,
  }
};
