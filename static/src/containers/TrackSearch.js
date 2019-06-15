import React, {Component} from 'react';
import _ from 'lodash'
import {connect} from "react-redux";
import {
  Form,
  FormField,
  Icon, Pagination,
  Search, Button,
  Segment, Table, Label
} from 'semantic-ui-react'
import {Content} from '../components/Content';
import {filterByBPM} from "../actions/searchActions";

const initialState = {
  isLoading: false,
  results: [],
  genreInput: '',
  inputFilter: {
    minBPM: '',
    maxBPM: '',
    genres: new Set([])
  },
  activePage: 1,
  availableGenres: {}
};

const source = [{title: 'Dance'}, {title: 'Pop'}, {title: 'Reggae'}, {title: 'Opera'}];

const resultRenderer = ({title}) => <Label content={title} />;

class TrackSearch extends Component {
  state = initialState;


  static defaultProps = {
    exampleTracks: [
      {track_name: 'Time is running out', artist_name: 'Muse', tempo: 'X', genre: 'Rock', track_id: 'A'},
    ]
  };

  parseNumber = (value) => {
    let number;
    if (value === '' || isNaN(parseInt(value, 10))) {
      number = '';
    } else {
      number = parseInt(value, 10);
    }

    return number;
  };

  handleSearchChange = (e, { value } ) => {
    this.setState({ isLoading: true, genreInput: value });

    setTimeout(() => {
      // if (this.state.value.length < 1) return this.setState(initialState);

      const re = new RegExp(_.escapeRegExp(this.state.genreInput), 'i');
      const isMatch = result => re.test(result.title);

      this.setState({
        isLoading: false,
        availableGenres: _.filter(source, isMatch),
      })
    }, 300)
  };

  onAddGenreFromSuggestions = (e, {result}) => {
    const {inputFilter} = this.state;
    const {genres} = inputFilter;

    let newGenres = new Set(genres);
    newGenres.add(result.title);
    this.setState({
      genreInput: '',
      inputFilter: {
        ...inputFilter,
        genres: newGenres
      }
    })
  };

  onClickGenreButtonToRemove = (genre) => {
    const {inputFilter} = this.state;
    const {genres} = inputFilter;

    let newGenres = new Set(genres);
    newGenres.delete(genre);
    this.setState({
      inputFilter: {
        ...inputFilter,
        genres: newGenres
      }
    })
  }

  renderFilterByBPMSearch() {
    const {availableGenres, genreInput, isLoading, inputFilter} = this.state;
    const {minBPM, maxBPM, genres} = inputFilter;

    return (
      <Segment>
        <Form>
          <Form.Group>
            <div style={{display: 'flex', flex: 1}}>
              <div style={{marginLeft: '1em'}}>
              <Form.Input
                as={FormField}
                label={'Minimum BPM'}
                min={20}
                max={500}
                maxLength={3}
                onChange={(e, {value}) => {
                  this.setState({
                    inputFilter: {
                      ...inputFilter,
                      minBPM: this.parseNumber(value)
                    }
                  });
                }}
                placeholder={'ex: 20'}
                value={minBPM}
              />
              </div>
              <div style={{marginLeft: '1em'}}>
              <Form.Input
                as={FormField}
                label={'Maximum BPM'}
                min={20}
                max={500}
                maxLength={3}
                onChange={(e, {value}) => {
                  this.setState({
                    inputFilter: {
                      ...inputFilter,
                      maxBPM: this.parseNumber(value)
                    }
                  });
                }}
                placeholder={'ex: 150'}
                value={maxBPM}
              />
              </div>
              <div style={{marginLeft: '1em'}}>
                <div className={'field'}>
                  <label>Genres</label>
                  <Search
                    loading={isLoading}
                    results={availableGenres}
                    value={genreInput}
                    onResultSelect={this.onAddGenreFromSuggestions}
                    onSearchChange={_.debounce(this.handleSearchChange, 500, {
                      leading: true
                    })}
                    resultRenderer={resultRenderer}
                  />
                </div>
              </div>
              <div style={{display: 'flex', marginLeft: '1em', alignItems: 'flex-end'}}>
                <Form.Button
                  icon
                  labelPosition={'right'}
                  onClick={(e) => {
                    e.preventDefault();
                    this.props.filterByBPM(minBPM, maxBPM);
                  }}
                  disabled={!minBPM || !maxBPM || minBPM < 20 || maxBPM > 500 || maxBPM < minBPM}
                >
                  <Icon name={'search'} />
                  Search
                </Form.Button>
              </div>
            </div>
          </Form.Group>
          <Form.Group>
            <div style={{display: 'flex', flex: 1}}>
              {[...genres].map((genre) => {
                return (
                  <div key={genre} style={{marginLeft: '1em'}}>
                    <Button
                      positive
                      onClick={() => {this.onClickGenreButtonToRemove(genre)}}
                    >
                      {genre}
                    </Button>
                  </div>
                );
              })}
            </div>
          </Form.Group>
        </Form>
      </Segment>
    )
  }


  renderResults() {
    const {filteredResults, totalPages} = this.props;
    const {inputFilter, activePage} = this.state;
    const {minBPM, maxBPM} = inputFilter;

    const paginationFooter = (
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <Pagination
          activePage={activePage}
          totalPages={totalPages}
          onPageChange={(e, {activePage}) => {
            this.setState({
              activePage
            });
            this.props.filterByBPM(minBPM, maxBPM, activePage)
          }}
        />
      </div>
    );

    return (
      <div>
        <div style={{display: 'flex', justifyContent: 'flex-start'}}>
          <Table fixed={true}>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Artist</Table.HeaderCell>
                <Table.HeaderCell>Track Title</Table.HeaderCell>
                <Table.HeaderCell>BPM</Table.HeaderCell>
                <Table.HeaderCell>Genre</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {filteredResults.map((song, i) => {
                return (
                  <Table.Row key={`${song.track_id}-${i}`}>
                    <Table.Cell>{song.artist_name}</Table.Cell>
                    <Table.Cell>{song.track_name}</Table.Cell>
                    <Table.Cell>{song.tempo}</Table.Cell>
                    <Table.Cell>{song.genres.join(', ')}</Table.Cell>
                  </Table.Row>
                )
              })}
            </Table.Body>
          </Table>
        </div>
        {totalPages > 0 ? paginationFooter : null}
      </div>
    )
  }

  render() {
    return (
      <Content>
        {this.renderFilterByBPMSearch()}
        {this.renderResults()}
      </Content>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    auth: state.authReducer,
    filteredResults: state.searchReducer.results,
    totalPages: state.searchReducer.totalPages,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    filterByBPM: (minBPM, maxBPM, page=1, genres=[]) => {
      dispatch(filterByBPM(minBPM, maxBPM, page, genres));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(TrackSearch);
