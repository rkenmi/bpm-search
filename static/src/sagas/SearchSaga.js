import {call, put, takeEvery} from 'redux-saga/effects';
import {AUTH, DEV_URL, GENRES, TRACKS} from "../config/Api";
import axios from 'axios';
import {loginFailure, setAuthToken} from "../actions/authActions";
import {FILTER, GET_GENRES, LOGIN} from "../actions/types";
import {filteredBPMResponse, getGenresResponse} from "../actions/searchActions";

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

function* _filter(action) {
  let {minBPM, maxBPM, page=1, genres=new Set()} = action.payload;

  const genreParams = [...genres].join('__');
  const filterURI = `?page=${page}&tempo__range=${minBPM}__${maxBPM}&genres__terms=${genreParams}`;

  const timeBeforeQuery = new Date();
  try {
    const res = yield call([axios, axios.get], DEV_URL + TRACKS + filterURI);

    if (res.status === 200) {
      const timeAtResponse = new Date();
      const timeDiffMs = timeAtResponse.getMilliseconds() - timeBeforeQuery.getMilliseconds();
      console.log(res);
      const {results, count} = res.data;
      yield put(filteredBPMResponse(
        results,
        Math.floor(count / 10),
        timeDiffMs
      ));
    }
  } catch (e) {
    console.error(e);
    yield put(loginFailure(e.response.statusText));
  }

}

function* _getGenres() {

  try {
    const res = yield call([axios, axios.get], DEV_URL + GENRES);

    if (res.status === 200) {
      yield put(getGenresResponse(
        // Semantic UI Search suggestions look look for the `title` key
        res.data.map((obj) => {return {title: obj.name}})
      ));
    }
  } catch (e) {
    console.error(e);
    yield put(loginFailure(e.response.statusText));
  }

}

function* SearchSaga() {
  yield takeEvery(FILTER, _filter);
  yield takeEvery(GET_GENRES, _getGenres);
}

export default SearchSaga;
