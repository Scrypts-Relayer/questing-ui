import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import '../App.scss'
import { getWeb3, getNetwork, getBalancesForAll, getQuests} from '../services/services';
import Nav from './Nav'
import Create from './Create';
import Log from './Log';
import Faq from './Faq';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      web3 : null,
      network: null,
      contract : null,
      account : null,
      balances : {},
      isOpen: false,
      quests : []
    };
  }

  async componentWillMount() {

    let web3Res = await getWeb3();
    let net = await getNetwork(web3Res);
    let accounts = await web3Res.eth.getAccounts();
    let bals = await getBalancesForAll(net, accounts[0])
    let questRes = await getQuests(web3Res, net, accounts[0]);
    console.log(questRes);
    this.setState({
      network : net,
      web3 : web3Res,
      account : accounts[0],
      balances : bals,
      quests : questRes
    })

  }

  render() {
    const logPage = (props) => {
      return (
        <Log {...props}
          account={this.state.account}
          balances = {this.state.balances}
          network = {this.state.network}
          quests = {this.state.quests}
        />
      )
    }
    return (
      <Router>
        <Fragment>
          <div className="App">
            <Nav />
            <Route path="/" exact component={logPage} />
            <Route
              path="/log"
              component={logPage}
            />
            <Route path="/create" component={Create} />
            <Route path="/faq/" component={Faq} />
          </div>
        </Fragment>
      </Router>
    );
  }
}

export default App;
