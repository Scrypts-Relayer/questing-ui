import React, { Component} from "react";
import '../App.scss'
import QuestCard from './QuestCard'
import CompleteOverlay from './CompleteOverlay'
import {mintToMe, transferEscrow, checkOwner} from '../services/testing'
import {getBalancesForAll, getQuests, getImageUrl, createQuest, completeQuest} from '../services/questService'

class Log extends Component {

  constructor(props) {
    super(props);
    this.state = {
      overlay : false,
      selectedQuest : null,
      quests : [],
      showHelp : false
    };
    this.toggleOverlay = this.toggleOverlay.bind(this)
    this.hideHelp = this.hideHelp.bind(this)
    this.showHelp = this.showHelp.bind(this)
  }

  async componentWillMount(){
    let id = 678;
    // await mintToMe(this.props.web3, this.props.account, id)
    // await mintToMe(this.props.web3, this.props.account, id+1)
    // await checkOwner(0, this.props.web3, id)
    /* await checkOwner(0, this.props.web3, 675) */
    // await transferEscrow(this.props.web3, this.props.account, id)
    // await transferEscrow(this.props.web3, this.props.account, id+1)
    // await checkOwner(1, this.props.web3, id)
    // await createQuest(this.props.web3, this.props.net, this.props.account, '0x7bcD4667086d271070Ae32D92782D1e692a239EA', id, 1, true, ['0x7bcD4667086d271070Ae32D92782D1e692a239EA'])
    // await checkOwner(2, this.props.web3, id)

    // await completeQuest(this.props.web3, this.props.account, 5, [id]) // 678
    // await checkOwner(3, this.props.web3, id)
    let bals = await getBalancesForAll(this.props.net, this.props.account)
    let questRes = await getQuests(this.props.web3, this.props.net, this.props.account);
    this.setState({
      quests : questRes,
      balances : bals
    }, () => alert('done loading log'))
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
        />
        : ''}
        {this.state.showHelp ? this.helpOverlay() : ''}
        <div className="questContainer">
          <div className="questHeader">
            <h3>Quests Available</h3>
            <p
              className="infoText"
              id="headerInfoText"
              onMouseEnter={this.showHelp}
              onMouseLeave={this.hideHelp}
            >
                (What is this?)
            </p>
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
