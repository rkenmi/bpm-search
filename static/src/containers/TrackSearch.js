import React, {Component} from 'react';
import _ from 'lodash'
import {connect} from "react-redux";
import {Container, Grid, Header, Search, Segment} from 'semantic-ui-react'
import {LinksNav} from "../components/HorizontalMenu";

const initialState = { isLoading: false, results: [], value: '' }
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

  render() {
    const { isLoading, value, results } = this.state

    return (
      <Container>
        <LinksNav/>
        <Grid>
          <Grid.Column width={6}>
            <Search
              loading={isLoading}
              onResultSelect={this.handleResultSelect}
              onSearchChange={_.debounce(this.handleSearchChange, 500, {
                leading: true,
              })}
              results={results}
              value={value}
            />
          </Grid.Column>
          <Grid.Column width={10}>
            <Segment>
              <Header>State</Header>
              <pre style={{ overflowX: 'auto' }}>
              {JSON.stringify(this.state, null, 2)}
            </pre>
              <Header>Options</Header>
              <pre style={{ overflowX: 'auto' }}>
              {JSON.stringify(source, null, 2)}
            </pre>
            </Segment>
          </Grid.Column>
        </Grid>
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
