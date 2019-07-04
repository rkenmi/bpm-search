import {configure, mount, shallow, render} from 'enzyme';
import 'jsdom-global/register'; //at the top of file , even  , before importing react
import React from 'react';
import TrackSearch from '../containers/TrackSearch';
import Adapter from 'enzyme-adapter-react-16';
import {Provider} from 'react-redux';
import store from '../stores';
import {MemoryRouter} from 'react-router';

configure({ adapter: new Adapter() });

describe('<TrackSearch/> Component', () => {
  const component = (
    <Provider store={store}>
      <MemoryRouter>
        <TrackSearch/>
      </MemoryRouter>
    </Provider>
  );

  it('renders TrackSearch', () => {
    expect(render(component).text()).toEqual('BPM SearchLoginAboutMinimum BPMMaximum BPMGenresNo results found.SearchArtistTrack TitleBPMGenre');
  });

  it('mounts TrackSearch', () => {
    expect(mount(component).find('.field').length).toEqual(4);
  })
});
