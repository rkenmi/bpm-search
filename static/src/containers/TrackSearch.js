import React, {Component} from 'react';
import _ from 'lodash'
import {connect} from "react-redux";
import {
  Button,
  Container,
  Form,
  FormField,
  Grid,
  Header,
  Icon,
  Image,
  Input,
  Modal,
  Search,
  Segment
} from 'semantic-ui-react'
import {LinksNav} from "../components/HorizontalMenu";

const initialState = { isLoading: false, results: [], value: '', minBPM: '', maxBPM: ''};
const source = _.times(1, () => ({
  title: 'hi',
  description: 'description',
  image: '0',
  price: '1.32'
}));

class TrackSearch extends Component {
  state = initialState;

  handleResultSelect = (e, { result }) => this.setState({ value: result.title })

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value });

    setTimeout(() => {
      if (this.state.value.length < 1) return this.setState(initialState)

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = result => re.test(result.title)

      this.setState({
        isLoading: false,
        results: _.filter(source, isMatch),
      })
    }, 300)
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

  render() {
    const { isLoading, value, results, minBPM, maxBPM} = this.state;

    return (
      <Container>
        <Segment>
          <LinksNav/>
          <Grid>
            <Grid.Column>
              <Grid.Row>
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
              </Grid.Row>
            </Grid.Column>
          </Grid>
        </Segment>
      </Container>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    auth: state.authReducer,
  }
};

export default connect(mapStateToProps, null)(TrackSearch);
