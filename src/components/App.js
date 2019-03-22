import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import '../App.scss'
import Nav from './Nav'
import Create from './Create';
import Log from './Log';
import Footer from './Footer'
import Faq from './Faq';
import Landing from './Landing'
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
              <Route path="/landing" exact component={withWeb3Ctx(Landing)} />
              <Route path="/log" component={withWeb3Ctx(Log)} />
              <Route path="/create" component={withWeb3Ctx(Create)} />
              <Route path="/faq/" component={Faq} />
            </div>
            <Footer />
          </Fragment>
        </Router>
      </Web3Container>
    );
  }
}

