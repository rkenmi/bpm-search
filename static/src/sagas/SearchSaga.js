import {call, put, takeEvery} from 'redux-saga/effects';
import {AUTH, DEV_URL, TRACKS} from "../config/Api";
import axios from 'axios';
import {loginFailure, setAuthToken} from "../actions/authActions";
import {FILTER, LOGIN} from "../actions/types";
import {filteredBPMResponse} from "../actions/searchActions";

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

function* _filter(action) {
  let {minBPM, maxBPM, page=1, genres=new Set()} = action.payload;

  const genreParams = [...genres].join('__');
  const filterURI = `?page=${page}&tempo__range=${minBPM}__${maxBPM}&genres__terms=${genreParams}`;

  try {
    const res = yield call([axios, axios.get], DEV_URL + TRACKS + filterURI);

    if (res.status === 200) {
      console.log(res);
      const {results, count} = res.data;
      yield put(filteredBPMResponse(results, Math.floor(count / 10)));
    }
  } catch (e) {
    console.error(e);
    yield put(loginFailure(e.response.statusText));
  }

}

function* SearchSaga() {
  yield takeEvery(FILTER, _filter);
}

export default SearchSaga;
