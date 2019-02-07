import React, { Component, Fragment } from "react";
import '../App.scss'
import QuestCard from './QuestCard'

class Log extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  async componentWillMount() {

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
            rwdName={'ETH'}
          />
        </div>
      </div>
    );
  }
}

export default Log;
