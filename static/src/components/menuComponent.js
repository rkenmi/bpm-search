import React from 'react' // for semantic-ui-react
import {Icon, Menu} from 'semantic-ui-react'
import {Link} from "react-router-dom";

export default (activeItem) => {
  return (
    <Menu icon='labeled' vertical>
      <Link to='/'>
        <Menu.Item name='sign in' active={activeItem === 'sign in'} onClick={this.handleItemClick}>
          <Icon name='sign in' />
          Register / Login
        </Menu.Item>
      </Link>

      <Link to='/foobar'>
        <Menu.Item name='video camera' active={activeItem === 'video camera'} onClick={this.handleItemClick}>
          <Icon name='video camera' />
          Upload
        </Menu.Item>
      </Link>

      <Link to='/search'>
        <Menu.Item name='search' active={activeItem === 'search'} onClick={this.handleItemClick}>
          <Icon name='video camera' />
          Search
        </Menu.Item>
      </Link>
    </Menu>
  );
}
