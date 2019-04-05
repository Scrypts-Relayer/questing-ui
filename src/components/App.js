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
        <Router>
          <Fragment>
            <div className="App">
              <Nav />
              <Route path="/" exact component={withWeb3Ctx(Landing)} />
              <Web3Container>
                <Route path="/log" exact component={withWeb3Ctx(Log)} />
              </Web3Container>
              <Web3Container>
                <Route path="/create" component={withWeb3Ctx(Create)} />
              </Web3Container>
              <Route path="/faq/" component={Faq} />
            </div>
            <Footer />
          </Fragment>
        </Router>
    );
  }
}

