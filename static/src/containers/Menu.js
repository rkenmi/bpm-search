import { Component } from 'react'
import menuComponent from "../components/menuComponent";

export default class MenuExampleLabeledIconsVertical extends Component {
  state = { activeItem: 'sign in' };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return menuComponent(activeItem);
  }
}
