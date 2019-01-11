import React, { Component } from 'react';
import Create from './Create';
import Quests from './Quests';
import About from './About';
import { Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink } from 'reactstrap';

class App extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      page: 1 // 1:Quest, 2:Create, 3:About
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  page = (idx) => {
    if (idx === 1) {
      return <Quests />
    } else if (idx === 2) {
      return <Create />
    } else {
      return <About />
    }
  }
  render() {
    return (
      <div className="App">
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">reactstrap</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                  <NavLink href="/" onClick={() => {this.setState({page: 1})}}>Quest</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/create/" onClick={() => {this.setState({page: 2})}}>Create</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/about/" onClick={() => {this.setState({page: 3})}}>About</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
        {this.page(this.state.page)}
      </div>
    );
  }
}

export default App;
