import React, { Component} from "react";
import '../App.scss'
import icon from '../assets/img/ck.png'
import closeIcon from '../assets/img/letter-x.png'
import {getPrizeName} from '../services/questService'

class CompleteOverlay extends Component {

  getReqs(){
    return (
      this.props.quest.reqs.map((key, i)=>{
        let name = getPrizeName(key, this.props.network)
        let submitted = this.checkIfSubmitted(key)
        return(
          <div className="ctRow" key={i}>
            <img src={icon} alt={''} id="questReqTableImg"/>
            <h3 className="greyText" id="completeReqTitle">{name}</h3>
            {submitted ? <h3 className="greyText">tokenId: 978</h3> :  <input className="tokenIdInputComplete" placeholder="tokenId"/>}
            <div className="submitTokenIdNum" id={submitted ? 'inactive' : ''}>
              <h5 className="whiteText">Submit</h5>
            </div>
            <h5 className="greyText" id="submitStatus">{submitted ? 'Submitted' : 'Unsubmitted'}</h5>
          </div>
        )
      })
    )
  }

  checkIfSubmitted(address){
    return false;
    //check if we are the approved escrow account for the requirement

  }

  render() {
    return (
      <div className="CompleteOverlay">
        <div className="blurred" onClick={this.props.toggleOverlay}>
        </div>
        <div className="overLayBox">
          <img src={closeIcon} alt={''} id='completeCloseIcon' onClick={this.props.toggleOverlay}/>
          <h2 className="greyText">Complete Quest</h2>
          <img src={icon} alt={''} id="questCompleteImage"/>
          <h2>{this.props.quest.prizeAmt + " " + this.props.quest.prizeName}</h2>
          <h5 id="completeHelpText">To complete this quest, submit the required token IDs below. After submitting all tokens required, complete the quest to claim your prize. </h5>
          <div className="completeTable">
            <div className="ctHeader">
              <h3>Requirements</h3>
              <h3>Status</h3>
            </div>
            {this.getReqs()}
          </div>
          <div className="completeQuestOverlayButton">
            <h5 className="whiteText">Complete</h5>
          </div>
        </div>
      </div>
    );
  }
}

export default CompleteOverlay;
