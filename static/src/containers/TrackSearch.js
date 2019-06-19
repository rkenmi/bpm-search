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
import {filterByBPM, getGenres} from "../actions/searchActions";

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
  availableGenres: [],
  availableGenresSelectable: []
};

const resultRenderer = ({title}) => <Label content={title} />;

class TrackSearch extends Component {
  state = initialState;

  componentDidMount() {
    this.props.getGenres();
  }

  componentDidUpdate(prevProps) {
    // Update when Get Genres Query has a response
    if (prevProps.allGenres.length === 0 && this.props.allGenres.length > 0) {
      this.setState({
        availableGenres: [...this.props.allGenres]
      })
    }
  }

  parseNumber = (value) => {
    let number;
    if (value === '' || isNaN(parseInt(value, 10))) {
      number = '';
    } else {
      number = parseInt(value, 10);
    }

    return number;
  };

  _updateSearchSelections(genreInput, availableGenres) {
    setTimeout(() => {

      const re = new RegExp(_.escapeRegExp(this.state.genreInput), 'i');
      const isMatch = result => re.test(result.title);

      this.setState({
        isLoading: false,
        availableGenresSelectable: _.filter(availableGenres, isMatch),
      })
    }, 300)
  }

  handleSearchChange = (e, { value } ) => {
    const {availableGenres, genreInput} = this.state;
    this.setState({ isLoading: true, genreInput: value });

    this._updateSearchSelections(genreInput, availableGenres);
  };

  onAddGenreFromSuggestions = (e, {result}) => {
    const {inputFilter, availableGenres, genreInput} = this.state;
    const {genres} = inputFilter;

    let newGenres = new Set(genres);
    newGenres.add(result.title);

    const newAvailableGenres = [...availableGenres].filter((curr) => curr.title !== result.title);

    this.setState({
      genreInput: '',
      inputFilter: {
        ...inputFilter,
        genres: newGenres
      },
      availableGenres: newAvailableGenres,
    });

    this._updateSearchSelections(genreInput, newAvailableGenres);
  };

  onClickGenreButtonToRemove = (genre) => {
    const {inputFilter, availableGenres} = this.state;
    const {genres} = inputFilter;


    let newGenres = new Set(genres);
    newGenres.delete(genre);
    const newAvailableGenres = [...availableGenres];
    newAvailableGenres.push({title: genre});
    this.setState({
      inputFilter: {
        ...inputFilter,
        genres: newGenres,
      },
      availableGenres: newAvailableGenres
    })
  };

  renderFilterByBPMSearch() {
    const {availableGenresSelectable, genreInput, isLoading, inputFilter} = this.state;
    const {minBPM, maxBPM, genres} = inputFilter;

    return (
      <Segment>
        <Form>
          <Form.Group>
            <div style={{display: 'flex', flexWrap: 'wrap'}}>
              <div style={{margin: '1em'}}>
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
              <div style={{margin: '1em'}}>
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

              <div style={{display: 'flex'}}>
                <div style={{margin: '1em'}}>
                  <div className={'field'}>
                    <label>Genres</label>
                    <Search
                      loading={isLoading}
                      placeholder={'ex: Pop'}
                      results={availableGenresSelectable}
                      value={genreInput}
                      onResultSelect={this.onAddGenreFromSuggestions}
                      onSearchChange={_.debounce(this.handleSearchChange, 500, {
                        leading: true
                      })}
                      resultRenderer={resultRenderer}
                    />
                  </div>
                </div>
                <div style={{display: 'flex', margin: '1em', alignItems: 'flex-end'}}>
                  <Form.Button
                    icon
                    labelPosition={'right'}
                    onClick={(e) => {
                      e.preventDefault();
                      this.props.filterByBPM(minBPM, maxBPM, 1, genres);
                    }}
                    disabled={minBPM !== '' && maxBPM !== '' && (minBPM < 20 || maxBPM > 500 || maxBPM < minBPM)}
                  >
                    <Icon name={'search'} />
                    Search
                  </Form.Button>
                </div>
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

  _renderPaginationFooter() {
    const {totalPages} = this.props;
    const {inputFilter, activePage} = this.state;
    const {minBPM, maxBPM, genres} = inputFilter;

    return (
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <Pagination
          activePage={activePage}
          totalPages={totalPages}
          prevItem={null}
          nextItem={null}
          onPageChange={(e, {activePage}) => {
            this.setState({
              activePage
            });
            this.props.filterByBPM(minBPM, maxBPM, activePage, genres)
          }}
        />
      </div>
    )
  }

  _renderMetaResults() {
    const {queryResponseMs} = this.props;

    return (
      <div style={{display: 'flex', margin: '1em', justifyContent: 'center'}}>
        <Label>{`Response from server retrieved in: ${queryResponseMs / 1000} seconds`}</Label>
      </div>
    )
  }

  renderResults() {
    const {filteredResults, totalPages, queryResponseMs} = this.props;

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
        {queryResponseMs > 0 ? this._renderMetaResults() : null}
        {totalPages > 0 ? this._renderPaginationFooter() : null}
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
    allGenres: state.searchReducer.allGenres,
    totalPages: state.searchReducer.totalPages,
    queryResponseMs: state.searchReducer.queryResponseMs,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    filterByBPM: (minBPM, maxBPM, page=1, genres=[]) => {
      if (minBPM === '') minBPM = 30;
      if (maxBPM === '') maxBPM = 500;
      dispatch(filterByBPM(minBPM, maxBPM, page, genres));
    },
    getGenres: () => {
      dispatch(getGenres());
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(TrackSearch);
