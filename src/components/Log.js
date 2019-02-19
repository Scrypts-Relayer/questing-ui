import React, { Component} from "react";
import '../App.scss'
import QuestCard from './QuestCard'

class Log extends Component {

  getQuestData() {
    return (
      this.props.quests.map((item, i)=>{
        return (
          <QuestCard 
              reqKeys = {item.reqs}
              amt={item.prizeAmt}
              prizeAddress={item.prizeAddress}
              id={item.id}
              network ={this.props.network}
              balances = {this.props.balances}
              key={i}
            />
        )
      })
    )
  }

  render() {
    return (
      <div className="log">
        <div className="questContainer">
          <div className="questHeader">
            <h3>Quests Available</h3>
            <p className="infoText" id="headerInfoText">(What is this?)</p>
          </div>
          <div className="questCardGrid">
            {this.getQuestData()}
          </div>
        </div>
      </div>
    );
  }
}

export default Log;
