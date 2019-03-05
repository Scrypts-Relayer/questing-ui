import React, { Component} from "react";
import '../App.scss'
import QuestCard from './QuestCard'
import CompleteOverlay from './CompleteOverlay'
import {getBalancesForAll, getQuests, getContract} from '../services/questService'
import {getFake} from '../services/testing'

class Log extends Component {

  constructor(props) {
    super(props);
    this.state = {
      overlay : false,
      selectedQuest : null,
      quests : []
    };
    this.toggleOverlay = this.toggleOverlay.bind(this)
  }

  async componentWillMount(){
    let fake = await getFake(this.props.web3)
    console.log(fake)
    let bals = await getBalancesForAll(this.props.web3, this.props.net, this.props.account)
    let questRes = await getQuests(this.props.web3, this.props.net, this.props.account);  
    this.setState({
      quests : questRes,
      balances : bals
    })
  }

  getQuestData() {
    return (
      this.state.quests.map((item, i)=>{
        return (
          <QuestCard
              reqKeys = {item.reqs}
              amt={item.prizeAmt}
              prizeAddress={item.prizeAddress}
              id={item.id}
              network ={this.props.network}
              balances = {this.state.balances}
              key={i}
              prizeName={item.prizeName}
              quest = {item}
              toggleOverlay = {this.toggleOverlay}
            />
        )
      })
    )
  }

  toggleOverlay(quest) { 
    this.setState({
      overlay : !this.state.overlay,
      selectedQuest : quest
    })
  }

  render() {
    return (
      <div className="log">
        {this.state.overlay ? 
        <CompleteOverlay 
          toggleOverlay={this.toggleOverlay} 
          quest={this.state.selectedQuest}
          balances={this.state.balances}
          network={this.props.network}         
        /> 
        : ''}
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
