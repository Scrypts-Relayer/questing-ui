import React, { Component } from 'react';
import Web3 from 'web3';
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

import { address, abi } from '../assets/contract';
import { setupWeb3 } from '../services/services';

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
      isConnected : true,
      web3 : null,
      contract : null,
      account : null,
      isOpen: false,
      page: pageDict // 1:Quest, 2:Create, 3:About
    };
  }

  async componentWillMount() {
    await setupWeb3(this);
    const contract = new this.state.web3.eth.Contract(abi, address);
    let accounts = []
    this.state.web3.eth.getAccounts().then(res => {
      accounts = res;
      this.setState({
        contract,
        account : accounts[0],
      })
    })
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  /*
  *
  * THIS FUNCTION WILL BE MOVED TO SERVICES
  * THIS FUNCTION IS HERE RN JUST TO HELP YOU DEVELOP, @IAN
  *
  */
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
