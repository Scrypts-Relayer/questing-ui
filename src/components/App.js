import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import '../App.scss'
import Nav from './Nav'
import Create from './Create';
import Log from './Log';
import Faq from './Faq';
import Web3Container from '../components/Web3Container'
import { withWeb3Ctx } from "../contexts/Web3Context";

export default class App extends Component {
  render() {
    return (
      <Web3Container>
        <Router>
          <Fragment>
            <div className="App">
              <Nav />
              <Route path="/" exact component={withWeb3Ctx(Log)} />
              <Route path="/log" component={withWeb3Ctx(Log)} />
              <Route path="/create" component={withWeb3Ctx(Create)} />
              <Route path="/faq/" component={Faq} />
            </div>
          </Fragment>
        </Router>
      </Web3Container>
    );
  }
}

