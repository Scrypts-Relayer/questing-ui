import React, { Component} from "react";
import '../App.scss'
import {transferEscrow} from '../services/questService'
import ReactLoading from 'react-loading';


class CreatePage3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadToEscrow : false
    };
    this.sendPrize = this.sendPrize.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleSkip = this.handleSkip.bind(this)
  
  }

  async sendPrize(){
    let escrowSuccess = true
    this.setState({
      loadToEscrow : true
    })
    try {
      await transferEscrow(
        this.props.web3, 
        this.props.network, 
        this.props.account,
        this.props.id
      )
    } catch(e){
      escrowSuccess = false
      this.props.togglePage(2)
      this.props.showError('You may not own selected prize')
    }
    if(escrowSuccess){
      this.props.togglePage(4)
    }
  }

  handleCancel(){
    this.props.togglePage(2)
  }

  handleSkip(){
    this.props.togglePage(4)
  }

  render() {
    return (
      <div className="createPage">
      <div className="escrowPage">
        <div className="createOverlay">
          {this.state.loadToEscrow ? 
          <div>
            <ReactLoading type={'bubbles'} color={'#7231FC'} height={167} width={175} /> 
            <h2 className="greyText" id="creatCheckHeader">Sending Prize To Escrow</h2>
          </div>
          : 
          <div className="">
            <h2 className="greyText" id="creatCheckHeader">Send Prize To Escrow</h2>
            <h3 id="createSubText">You are about to create a quest. Make sure you are the
              owner of the selected prize or your quest will not be 
              created. Once you click create you will be prompted to send your
              prize into escrow. You can cancel and retrieve your prize from
              escrow at any time until the quest is completed. If you've already submitted your 
              prize you can skip this page. 
            </h3>
            <div className="dataColumn">
              <h3>Token Address :  {this.props.address}</h3>
              {this.props.nft ? <h3>Token Id : {this.props.id}</h3> : 
              <h3>Token Amount : {this.props.amount}</h3>}
            </div>
            <div className="createButtonGroup">
              <div className="createButtonOverlay whiteText" onClick={this.sendPrize}>
                Send Prize To Escrow
              </div> 
              <div className="cancelButtonOverlay whiteText" onClick={this.handleSkip}>
                Skip
              </div>
              <div className="cancelButtonOverlay whiteText" onClick={this.handleCancel}>
                Cancel
              </div>
            </div>
          </div> 
          }
        </div>
      </div>        
      </div>
      
    );
  }
}

export default CreatePage3;