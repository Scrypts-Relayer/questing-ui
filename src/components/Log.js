import React, { Component} from "react";
import '../App.scss'
import QuestCard from './QuestCard'
import CompleteOverlay from './CompleteOverlay'
import {mintToMe, transferEscrow, checkOwne, checkApproval, checkOwner} from '../services/testing'
import {getBalancesForAll, getQuests, completeQuest} from '../services/questService'
import ReactLoading from 'react-loading';


class Log extends Component {

  constructor(props) {
    super(props);
    this.state = {
      overlay : false,
      selectedQuest : null,
      quests : [],
      showHelp : false,
      loadingQuest : true
    };
    this.toggleOverlay = this.toggleOverlay.bind(this)
    this.hideHelp = this.hideHelp.bind(this)
    this.showHelp = this.showHelp.bind(this)
  }

  async componentWillMount(){
    let id = 780;
    // await checkApproval(this.props.web3, this.props.account, id)
    //await checkOwner(this.props.web3, id)
    //await mintToMe(this.props.web3, this.props.account, id)
    //await transferEscrow(this.props.web3, this.props.account, id)
    //await completeQuest(this.props.web3, this.props.network, this.props.account, 4, [675]) // 678
    let bals = await getBalancesForAll(this.props.network, this.props.account)
    let questRes = await getQuests(this.props.web3, this.props.network, this.props.account);
    this.setState({
      quests : questRes,
      balances : bals,
      loadingQuest : false
    })
  }

  helpOverlay = () => (
    <div className="helpOverlay">
      <h3>Complete a quest to exchange requirement tokens for a prize. This screen shows all available quests that you can complete.</h3>
    </div>
  )

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

  showHelp(){
    this.setState({
      showHelp : true
    })
  }

  hideHelp(){
    this.setState({
      showHelp : false
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
          web3 = {this.props.web3}
          account={this.props.account}
        />
        : ''}
        {this.state.showHelp ? this.helpOverlay() : ''}
        <div className="questContainer">
          {this.state.loadingQuest ? 
          <div className="loadingBox">
            <h6>Loading Quests</h6>
            <ReactLoading type={'bubbles'} color={'#7231FC'} height={467} width={175} /> 
          </div>
          : ''}
          {this.state.loadingQuest ? '' : <div className="questHeader">
            <h3>Quests Available</h3>  
            <p
              className="infoText"
              id="headerInfoText"
              onMouseEnter={this.showHelp}
              onMouseLeave={this.hideHelp}
            >
                (What is this?)
            </p>
          </div>}
          <div className="questCardGrid">
            {this.getQuestData()}
          </div>
        </div>
      </div>
    );
  }
}

export default Log;
