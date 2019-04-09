import React, { Component} from "react";
import '../App.scss'
import {createQuest} from '../services/questService'
import ReactLoading from 'react-loading';

class CreatePage4 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadToEscrow : false
    };
    this.createQuest = this.createQuest.bind(this)
    this.generateReqsList = this.generateReqsList.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
  }

  componentDidMount(){
    window.scrollTo(0, 0)
  }

  generateReqsList(){
    let reqs = []
    for (let item of this.props.reqs){
      reqs.push(item.address)
    }
   return reqs
  }

  async createQuest(){
    let reqs = this.generateReqsList()
    this.setState({
      loadToEscrow : true
    })
    try{
      await createQuest(
        this.props.web3, 
        this.props.network,
        this.props.account,
        this.props.address,
        this.props.id,
        this.props.amount,
        this.props.nft,
        reqs
      )
    } catch (e){
      this.props.showError('Error creating your quest.')
      this.setState({
        loadToEscrow : false
      })
      this.props.togglePage(2)
    }
    //success
  }

  handleCancel(){
    this.props.togglePage(2)
  }

  render() {
    return (
        <div className="createPage">
            <div className="escrowPage">
            <div className="createOverlay">
              {this.state.loadToEscrow ? 
              <div>
                <ReactLoading type={'bubbles'} color={'#7231FC'} height={167} width={175} /> 
                <h2 className="greyText" id="creatCheckHeader">Creating your quest</h2>
              </div>
              : 
              <div className="">
                <h2 className="greyText" id="creatCheckHeader">Finalize and Create Quest</h2>
                <h3 id="createSubText">Your prize has been accepted and you're ready to create your quest. Once you
                create your quest users will be able to submit tokens and earn the prize. If a user completes
                your quest you will be given the requirement tokens. Happy questing. 
                </h3>
                <div className="createButtonGroup" id="forthPage">
                  <div className="button" onClick={this.createQuest}>
                    Create Quest
                  </div>
                  <div className="button" onClick={this.handleCancel}>
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

export default CreatePage4;