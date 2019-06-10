import React, {Component} from 'react';
import {Icon, Menu} from 'semantic-ui-react'
import {Link} from "react-router-dom";

export class LinksNav extends Component {
  render() {
    return (
      <HorizontalMenu
        entries={[
          {name: 'login', text: 'Login', link: '/login', onClick: () => {}},
          // {name: 'trackSearch', text: 'Track Search', link: '/trackSearch', onClick: () => {}},
          {name: 'about', text: 'About', link: '/about', onClick: () => {}},
        ]}
      />
    )
  }
}

export class HorizontalMenu extends Component {
  constructor() {
    super();
    this.state = {
      activeItem: null
    };
  }

  static defaultProps = {
    entries: []
  };

  handleItemClick = (data) => {
    this.setState({
      activeItem: data.name
    });
  };

  _getMenuItems() {
    const {entries} = this.props;
    const {activeItem} = this.state;

    let menuEntries = entries.map((entry) =>
      <Menu.Item
        key={entry.link}
        as={Link}
        to={entry.link}
        name={entry.name}
        link={false}
        active={activeItem === entry.name}
        onClick={(e, data) => {
          this.handleItemClick(data);
          if (entry.onClick) {
            entry.onClick();
          }
        }}>
        {entry.text}
      </Menu.Item>
    );

    return [<Menu.Item header key={'home'} as={Link} to={'/'}><h3>BPM Search</h3></Menu.Item>].concat(menuEntries);
  }

  render() {
    const {entries} = this.props;
    const {activeItem} = this.state;

    return (
      <Menu>
        {this._getMenuItems()}
      </Menu>
    )
  }
}
