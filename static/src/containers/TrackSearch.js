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

const initialState = { isLoading: false, results: [], value: '', minBPM: '', maxBPM: ''};

class TrackSearch extends Component {
  state = initialState;

  static defaultProps = {
    tracks: [
      {name: 'Time is running out', artist: 'Muse', bpm: 'X'},
      {name: 'Starlight', artist: 'Muse', bpm: 'Y'},
      {name: 'Children', artist: 'Robert Miles', bpm: 'Z'},
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
    const { minBPM, maxBPM} = this.state;

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
    const {tracks} = this.props;

    return (
      <div style={{display: 'flex', justifyContent: 'flex-start'}}>
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Track Title</Table.HeaderCell>
              <Table.HeaderCell>Artist</Table.HeaderCell>
              <Table.HeaderCell>BPM</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {tracks.map((song) => {
              return (
                <Table.Row key={song.name}>
                  <Table.Cell>{song.name}</Table.Cell>
                  <Table.Cell>{song.artist}</Table.Cell>
                  <Table.Cell>{song.bpm}</Table.Cell>
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
  }
};

export default connect(mapStateToProps, null)(TrackSearch);
