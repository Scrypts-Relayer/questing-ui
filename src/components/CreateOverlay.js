import React, { Component} from "react";
import '../App.scss'
import {createQuest} from '../services/questService'

class CreateOverlay extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  async componentWillMount(){
    this.create()
  }


  async create(){
    console.log(this.props.reqs)
    try{
      // await createQuest(
      //   this.props.web3, 
      //   this.props.network,
      //   this.props.account,
      //   this.props.address,
      //   this.props.id,
      //   this.props.amount,
      //   this.props.nft,
      //   reqs
      // )
    }catch (e){
      console.log(e)
    }
  }

  render() {
    return (
      <div className="createOverlay">
        <div className="blurred" onClick={this.props.toggleOverlay} />
        <div className="overLayBox">
            <h2 className="greyText" id="creatCheckHeader">Create Quest</h2>
            <h3 id="createSubText">You are about to create a quest. Make sure you are the
              owner of the selected prize or your quest will not be 
              created. Once you click create you will be prompted to send your
              prize into escrow. You can cancel and retrieve your prize from
              escrow at any time until the quest is completed.
            </h3>
            <div className="dataColumn">
              <h3>Token Address :  {this.props.address}</h3>
              {this.props.nft ? <h3>Token Id : {this.props.id}</h3> : 
              <h3>Token Amount : {this.props.amount}</h3>}
            </div>
            <div className="createButtonGroup">
              <div className="createButtonOverlay whiteText" >
                Create
              </div>
              <div className="cancelButtonOverlay whiteText" onClick={this.props.toggleOverlay}>
                Cancel
              </div>
            </div>
        </div>
      </div>
      
    );
  }
}

export default CreateOverlay;