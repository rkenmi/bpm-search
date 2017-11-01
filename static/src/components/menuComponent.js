import React from 'react'  // for semantic-ui-react
import { Icon, Menu } from 'semantic-ui-react'

export default (activeItem) => {
  return (
    <Menu icon='labeled' vertical>
      <Menu.Item name='sign in' active={activeItem === 'sign in'} onClick={this.handleItemClick}>
        <Icon name='sign in' />
        Register / Login
      </Menu.Item>

      <Menu.Item name='video camera' active={activeItem === 'video camera'} onClick={this.handleItemClick}>
        <Icon name='video camera' />
        Upload
      </Menu.Item>

      <Menu.Item name='video play' active={activeItem === 'video play'} onClick={this.handleItemClick}>
        <Icon name='video play' />
        Videos
      </Menu.Item>
    </Menu>
  );
}
