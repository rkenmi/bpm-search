import React, {Component} from 'react';
import _ from 'lodash'
import {connect} from "react-redux";
import {
  Form,
  FormField,
  Icon,
  Segment, Table
} from 'semantic-ui-react'
import {Content} from '../components/Content';
import {filterByBPM} from "../actions/searchActions";

const initialState = { isLoading: false, results: [], value: '', minBPM: '', maxBPM: ''};

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

  renderFilterByBPMSearch() {
    const {minBPM, maxBPM} = this.state;

    return (
      <Segment>
        <Form>
          <Form.Group>
            <div style={{display: 'flex', flex: 0.5, justifyContent: 'space-around'}}>
              <Form.Input
                as={FormField}
                label={'Minimum BPM'}
                min={20}
                max={500}
                maxLength={3}
                onChange={(e, {value}) => {
                  this.setState({minBPM: this.parseNumber(value)});
                }}
                placeholder={'20'}
                value={minBPM}
              />
              <Form.Input
                as={FormField}
                label={'Minimum BPM'}
                min={20}
                max={500}
                maxLength={3}
                onChange={(e, {value}) => {
                  this.setState({maxBPM: this.parseNumber(value)});
                }}
                placeholder={'150'}
                value={maxBPM}
              />
              <div style={{display: 'flex', alignItems: 'flex-end'}}>
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
        </Form>
      </Segment>
    )
  }


  renderResults() {
    const {filteredResults} = this.props;

    return (
      <div style={{display: 'flex', justifyContent: 'flex-start'}}>
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Artist</Table.HeaderCell>
              <Table.HeaderCell>Track Title</Table.HeaderCell>
              <Table.HeaderCell>BPM</Table.HeaderCell>
              <Table.HeaderCell>Genre</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {filteredResults.map((song) => {
              return (
                <Table.Row key={song.track_id}>
                  <Table.Cell>{song.artist_name}</Table.Cell>
                  <Table.Cell>{song.track_name}</Table.Cell>
                  <Table.Cell>{song.tempo}</Table.Cell>
                  <Table.Cell>{song.genre}</Table.Cell>
                </Table.Row>
              )
            })}
          </Table.Body>
        </Table>
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
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    filterByBPM: (minBPM, maxBPM) => {
      dispatch(filterByBPM(minBPM, maxBPM));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(TrackSearch);
