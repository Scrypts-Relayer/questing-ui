import React, { Component} from "react";
import '../App.scss'
import SelectedReqItem from './SelectedReq.js'
import nfts from '../assets/erc721s.js'
import erc20s from '../assets/erc20s.js'
import CreatePage1 from './CreatePage1'
import CreatePage2 from './CreatePage2'
import CreatePage3 from "./CreatePage3";
import CreatePage4 from './CreatePage4'
import {ToastMessage} from 'rimble-ui'

class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step : 1,
      title : '',
      selectedReqs : new Set(),
      selectedPrize : 'KITTYR',
      selectedPrizeAddress : '',
      titleError : false, 
      reqError : false,
      amtError : false,
      amount : 1,
      tokenId : 0,
      nftSelected : true,
      showDropwDown : true,
      overlay : false
    };
    this.add = this.add.bind(this);
    this.showError = this.showError.bind(this)
    this.remove = this.remove.bind(this)
    this.togglePage = this.togglePage.bind(this)
    this.updateSelectedPrize = this.updateSelectedPrize.bind(this)
    this.populateSelectedReqs = this.populateSelectedReqs.bind(this)
  }

  async componentWillMount() {
  
  }

  populateSelectedReqs(){
    return (
      Object.keys(nfts[this.props.network]).map((key, i) => {
        if(this.state.selectedReqs.has(nfts[this.props.network][key])){
          return(
            <div className="createRow" key={i}>
              <SelectedReqItem 
                name={nfts[this.props.network][key].name}
                remove={this.remove}
                itemKey = {key}
                key ={key}
                />
            </div>
          )
        }
        return ''
      })
    )
  }

  updateSelectedPrize(key){
    this.setState({
      prizeError : false
    })
    if(nfts[this.props.network].hasOwnProperty(key)){
      this.setState({
        amount : 1,
        nftSelected : true,
        amtError : false,
        selectedPrize : key,
        selectedPrizeAddress : nfts[this.props.network][key].address,
      })
    } else {
      this.setState({
        nftSelected : false,
        selectedPrize : key,
      })
    }
  }

  add(key){
    //if theres 2 and about to be 3
    let show = true;
    if(this.state.selectedReqs.size ===2){
      show = false
    }
    const old = this.state.selectedReqs;
    const newSet = old.add(nfts[this.props.network][key])
    this.setState({
      selectedReqs : newSet,
      showDropwDown : show
    })
  }

  remove(key){
    //if theres 2 and about to be 3
    let show = true;
    if(this.state.selectedReqs.size <=3){
      show = true
    }
    const old = this.state.selectedReqs;
    old.delete(nfts[this.props.network][key])
    this.setState({
      selectedReqs : old,
      showDropwDown : show
    })
  }

  showError(message){
    window.toastProvider.addMessage('Transaction Failed', {
      secondaryMessage: message,
      variant: 'failure',
    })
  }

  togglePage(page){
    this.setState({
      step : page
    })
  }

  getAddress(){
    let address;
    if(this.state.nftSelected){
      address = nfts[this.props.network][this.state.selectedPrize].address
    } else {
      address = erc20s[this.props.network][this.state.selectedPrize].address
    }
    return address
  }

  selectPage() {
    if(this.state.step === 1){
      return (
        <CreatePage1 
          populateSelectedReqs = {this.populateSelectedReqs}
          add = {this.add}
          network = {this.props.network}
          togglePage = {this.togglePage}
          reqError = {this.state.reqError}
          showDropwDown = {this.state.showDropwDown}
          titleError = {this.state.titleError}
          selectedReqs = {this.state.selectedReqs}
        />
      )
    } 
    if(this.state.step === 2){
      return (
        <CreatePage2 
          network={this.props.network}
          display721s = {this.display721s}
          display20s = {this.display20s}
          amtError = {this.state.amtError}
          amount = {this.state.amount}
          instance = {this}
          selectedPrize = {this.state.selectedPrize}
          updateSelectedPrize={this.updateSelectedPrize}
          tokenId={this.state.tokenId}
          togglePage = {this.togglePage}
        />
      )
    }
    if (this.state.step === 3){
      return (
          <CreatePage3 
            network={this.props.network}
            web3={this.props.web3}
            account={this.props.account}
            prizeKey = {this.state.selectedPrize}
            id = {this.state.tokenId}
            togglePage = {this.togglePage}
            amount = {this.state.amount}
            nft = {this.state.nftSelected}
            address={this.getAddress()}
            reqs={this.state.selectedReqs}
            showError = {this.showError}
          /> 
      ) 
    } 
    if (this.state.step === 4){
      return (
        <CreatePage4 
          network={this.props.network}
          web3={this.props.web3}
          account={this.props.account}
          prizeKey = {this.state.selectedPrize}
          id = {this.state.tokenId}
          togglePage = {this.togglePage}
          amount = {this.state.amount}
          nft = {this.state.nftSelected}
          address={this.getAddress()}
          reqs={this.state.selectedReqs}
          showError = {this.showError}
        /> 
      )
    }
  } 

  render() {
    return (
      <div className="createBucket">
        <div className="createLeft">
          <p className="createQuestText">Create A Quest</p>
          <div className="wizardBox">
            <div className="line" />
            <div className="wizardRow">
            <div className={this.state.step === 1 ? "wizardCirle activeWizard" : 'wizardCircle'} />
              <div className={this.state.step === 1 ? "wizardStep activeWizardText" : 'wizardStep'}>
                Select Requirements
              </div>
            </div>
            <div className="wizardRow">
              <div className={this.state.step === 2 ? "wizardCirle activeWizard" : 'wizardCircle'} />
              <div className={this.state.step === 2 ? "wizardStep activeWizardText" : 'wizardStep'}>
                Select Prize
              </div>
            </div>
            <div className="wizardRow">
            <div className={this.state.step === 3 ? "wizardCirle activeWizard" : 'wizardCircle'} />
              <div className={this.state.step === 3 ? "wizardStep activeWizardText" : 'wizardStep'}>
                Lock Prize In Escrow
              </div>
            </div>
            <div className="wizardRow">
            <div className={this.state.step === 4 ? "wizardCirle activeWizard" : 'wizardCircle'} />
              <div className={this.state.step === 4 ? "wizardStep activeWizardText" : 'wizardStep'}>
                Finalize
              </div>
            </div>
          </div>
        </div>
        <div className="createRight">
          <ToastMessage.Provider ref={node => window.toastProvider = node} />
          {this.selectPage()}
        </div>
      </div>
      
    );
  }
}

export default Create;