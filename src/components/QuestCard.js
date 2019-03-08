import React, { Component} from "react";
import '../App.scss'
import QuestReqItem from './QuestReqItem'
import ckImage from '../assets/img/ck.png'
import {getName, getImageUrl} from '../services/questService'
class QuestCard extends Component {

  generateRequirements(){
    if(this.props.network){
      return (
        this.props.reqKeys.map((key, i)=>{
          let balance = this.props.balances[key.toLowerCase()]
          let name = getName(key, this.props.network)
          return(
            <QuestReqItem 
              reqName={name}
              balance={balance > 0 ? 1 : 0}
              key={i}
            />
          )
        })
      )
    }
  }

  render() {
    return (
      <div className="questCard">
        <div className="qcardTop">
          <p className="boldGrey">Reward</p>
          <h6>{this.props.amt} {getName(this.props.prizeAddress, this.props.network)}</h6>
          <img id="questCardImage" src={ckImage} alt={''} />
        </div>
        <div className="qcardBottom">
          <p className="boldGrey">Requirements</p>
          <div className="questReqContainer">
            {this.generateRequirements()}
          </div>
          <div className="questSubmit" onClick={(e) => this.props.toggleOverlay(this.props.quest)}>
            <h4 className="whiteText">Complete</h4>
          </div>
          <h4 id="questIdText">questID : {this.props.id}</h4>
        </div>
      </div>
    );
  }
}

export default QuestCard;
