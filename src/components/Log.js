import React, { Component} from "react";
import '../App.scss'
import QuestCard from './QuestCard'
import {setupWeb3} from '../services/services.js'

class Log extends Component {
  constructor(props) {
    super(props);
    this.state = {
      web3 : null
    };
  }

  async componentWillMount() {
    await setupWeb3(this);
    //getPolicies(this.state.web3);
  }

  render() {
    return (
      <div className="log">
        <div className="questContainer">
          <div className="questHeader">
            <h3>Quests Available</h3>
            <p className="infoText" id="headerInfoText">(What is this?)</p>
          </div>
          <QuestCard 
            amt={10}
            rwdName={'DAI'}
            id={2}
          />
          <QuestCard 
            amt={10}
            rwdName={'ETH'}
            id={2}
          />
          <QuestCard 
            amt={10}
            rwdName={'ETH'}
            id={2}
          />
          <QuestCard 
            amt={10}
            rwdName={'ETH'}
            id={2}
          />
          <QuestCard 
            amt={10}
            rwdName={'ETH'}
            id={2}
          />
        </div>
      </div>
    );
  }
}

export default Log;
