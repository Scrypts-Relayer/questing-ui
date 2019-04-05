import React, { Component} from "react";
import '../App.scss'
import icon from '../assets/img/ck.png'
import closeIcon from '../assets/img/letter-x.png'
import {getName, checkSubmission, completeQuest} from '../services/questService'

class CompleteOverlay extends Component {

  constructor(props) {
    super(props);
    this.state = {
      submittedKey :  {},
      allSubmitted : true
    };
  }

  async componentWillMount(){
    await this.checkIfSubmitted()
  }

   getReqs(){
    return (
      this.props.quest.reqs.map((key, i)=>{
        key=key.toLowerCase()
        let name = getName(key, this.props.network)
        return(
          <div className="ctRow" key={i}>
            <img src={icon} alt={''} id="questReqTableImg"/>
            <h3 className="greyText" id="completeReqTitle">{name}</h3>
            {this.state.submittedKey[key] !== false ? <h3 className="greyText" id="tokenIdTextOverlay">tokenId: {this.state.submittedKey[key]}</h3> :  <input className="tokenIdInputComplete" placeholder="tokenId"/>}
            <div className="submitTokenIdNum" id={this.state.submittedKey[key] !== false ? 'inactive' : ''} onClick={(key) => this.submitOne(key)}>
              <h5 className="whiteText">Submit</h5>
            </div>
            <h5 className="greyText" id="submitStatus">{this.state.submittedKey[key] !== false ? 'Submitted' : 'Unsubmitted'}</h5>
          </div>
        )
      })
    )
  }
  // during componentDidMount, called once
  async checkIfSubmitted(){ 
    let submittedKey = {}
    this.props.quest.reqs.map(async (key, i)=>{
      let res;
      key = key.toLowerCase()
      try {
        res = await checkSubmission(this.props.web3, key, this.props.balances)
      } catch (error){
        res = false
      }
      if(res !== false){
        submittedKey[key] = res
        this.setState({
          submittedKey : submittedKey
        })
      } else {
        submittedKey[key] = false
        this.setState({
          submittedKey : submittedKey,
          allSubmitted : false
        })
      }
    })
  }

  checkIfSubmittedAfterLoad(){
    let allSubmitted = false;
    this.props.quest.reqs.map(async (key, i)=>{
      allSubmitted = allSubmitted && i;
      this.setState({ allSubmitted })
    })
  }


  getReqArrayForCompletion(){
    let reqArray = []
    this.props.quest.reqs.map((key, i)=>{
      let id = this.state.submittedKey[key.toLowerCase()]
      reqArray.push(id)
      return true
    })
    return reqArray
  }

  submitOne = async (addr) => {
    try {
      await checkSubmission(this.props.web3, addr, this.props.balances);
      this.checkIfSubmittedAfterLoad();
    } catch(err) {
      // alert('ERROR IN submitOne(): ', err)
    }
  }

  handleCompleteQuest = async () => {
    if(!this.state.allSubmitted){
      
    } else {
        try {
          let ls = this.getReqArrayForCompletion()
          await completeQuest(this.props.web3, this.props.network, this.props.account, this.props.quest.id, ls)
        } catch(err) {
          
        }
    }
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
          <div className="completeQuestOverlayButton"
               id={this.state.allSubmitted ? '' : 'inactive'}
               onClick={() => this.handleCompleteQuest()}>
            <h5 className="whiteText">Complete</h5>
          </div>
        </div>
      </div>
    );
  }
}

export default CompleteOverlay;
