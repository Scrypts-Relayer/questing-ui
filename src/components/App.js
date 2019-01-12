import React, { Component } from 'react';
import { Container, Row, Col,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink } from 'reactstrap';

import Footer from './Footer';
import Page from './Page';

class App extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    let pageDict;
    if (window.location.pathname === '/about' || window.location.pathname === '/about/') {
      pageDict = 3
    } else if (window.location.pathname === '/create' || window.location.pathname === '/create/') {
      pageDict = 2
    } else {
      pageDict = 1
    }
    this.state = {
      isOpen: false,
      page: pageDict // 1:Quest, 2:Create, 3:About
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  getQuests = () => {
    return ["quest to alabama", "nola quest", "i love me some quests quest"]
  }
  render() {
    return (
      <div id="App">
        <Navbar id="nav" color="light" light expand="md">
          <NavbarBrand href="/">reactstrap</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink onClick={() => {this.setState({page: 1})}}>Quest</NavLink>
              </NavItem>
              <NavItem>
                <NavLink onClick={() => {this.setState({page: 2})}}>Create</NavLink>
              </NavItem>
              <NavItem>
                <NavLink onClick={() => {this.setState({page: 3})}}>About</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
        <Container>
          <Row>
            <Col xs="3"></Col>
            <Col>
              <Page quests={this.getQuests()} page={this.state.page} />
            </Col>
            <Col xs="3"></Col>
          </Row>
        </Container>
        <Footer/>
      </div>
    );
  }
}

export default App;
