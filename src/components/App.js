import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import '../App.scss'
import { setupWeb3, setupState } from '../services/services';
import Nav from './Nav'
import Create from './Create';
import Log from './Log';
import Faq from './Faq';

class App extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      web3 : null,
      net: null,
      contract : null,
      account : null,
      isOpen: false,
    };
  }

  async componentWillMount() {
    await setupWeb3(this);
    await setupState(this);
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
            <Route path="/" exact component={Log} />
            <Route path="/log" component={Log} />
            <Route path="/create" component={Create} />
            <Route path="/faq/" component={Faq} />
          </div>
        </Fragment>
      </Router>
    );
  }
}

export default App;
