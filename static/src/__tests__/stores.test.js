import {filteredBPMResponse} from '../actions/searchActions';
import {storeFactory} from '../stores';
import deepFreeze from 'deep-freeze';

describe('global redux store', () => {
  let store;
  const searchState = {
    results: ['Song 1', 'Song 2'],
    page: 0,
    totalPages: 1,
    queryResponseMs: 350,
    allGenres: ['Pop']
  };
  deepFreeze(searchState);

  beforeAll(() => {
    store = storeFactory(searchState);
    const action = filteredBPMResponse(['Song A', 'Song B'], 3, 1000);
    store.dispatch(action);
  });

  it('should update the results', () => {
    const state = store.getState();
    expect(state.searchReducer.results).toEqual(['Song A', 'Song B'])
  });

  it('should update the total pages for search results', () => {
    const state = store.getState();
    expect(state.searchReducer.totalPages).toEqual(3)
  });

  it('should update the search query response time', () => {
    const state = store.getState();
    expect(state.searchReducer.queryResponseMs).toEqual(1000)
  });
});
