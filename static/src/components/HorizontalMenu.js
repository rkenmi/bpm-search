import React, {Component} from 'react';
import {Icon, Menu} from 'semantic-ui-react'
import {Link} from "react-router-dom";

export default class HorizontalMenu extends Component {

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

    return entries.map((entry) =>
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
