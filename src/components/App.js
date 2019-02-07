import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import '../App.scss'
import Web3 from 'web3';
import { address, abi } from '../assets/contract';
import { setupWeb3 } from '../services/services';
import Nav from './Nav'
import Create from './Create';

class App extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isConnected : true,
      web3 : null,
      contract : null,
      account : null,
      isOpen: false,
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

  getQuests = () => {
    return ["quest to alabama", "nola quest", "i love me some quests quest"]
  }

  render() {
    return (
      <Router>
        <Fragment>
          <div className="App"> 
            <Nav />
            <Route path="/" exact component={Create} />
            <Route path="/quests/" exact component={Create} />
            <Route path="/create" component={Create} />
            <Route path="/faq/" component={Create} />
          </div>
        </Fragment>
      </Router>
    );
  }
}

export default App;
