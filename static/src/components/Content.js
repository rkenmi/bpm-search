import React, {Component} from 'react';
import {Container, Icon, Menu, Segment} from 'semantic-ui-react'
import {LinksNav} from './HorizontalMenu';

export class Content extends Component {
  render() {
    const {children} = this.props;

    return (
      <Container>
        <Segment basic>
          <LinksNav/>
          {children}
        </Segment>
      </Container>
    )
  }
}
