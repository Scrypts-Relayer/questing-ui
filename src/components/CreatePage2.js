import React, { Component} from "react";
import '../App.scss'
import ReactLoading from 'react-loading';
import nfts from '../assets/erc721s.js'
import erc20s from '../assets/erc20s.js'
import cat from '../assets/img/ck.png'


class CreatePage2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amtError : false,
      amount : 0
    }

    this.handleBack = this.handleBack.bind(this)
    this.handleNext = this.handleNext.bind(this)
    this.checkForFields = this.checkForFields.bind(this)
  }

  componentDidMount(){
    window.scrollTo(0, 0)
  }

  display721s(){
    return (
      Object.entries(nfts[this.props.network]).map((item)=>{
        return (
          <div 
            className={this.props.selectedPrize === item[0] ? "prizeCard prizeCardSelected" : "prizeCard"} 
            key={item[0]} 
            onClick={(event)=>{this.props.updateSelectedPrize(item[0])}}
          >
            <p className="prizeTokenTicker">{item[1].name}</p>
            <img alt={''} src={cat} id="prizePic" />
          </div>
        )
      })
    )
  }

  display20s(){
    return (
      Object.entries(erc20s[this.props.network]).map((item)=>{
        return (
          <div 
            className={this.props.selectedPrize === item[0] ? "prizeCard prizeCardSelected" : "prizeCard"} 
            key={item[0]} 
            onClick={(event)=>{this.props.updateSelectedPrize(item[0])}}
          >
          <p className="prizeTokenTicker">{item[0]}</p>
          <img alt={''} src={cat} id="prizePic" />
          </div>
        )
      })
    )
  }

  checkForFields(){
    let valid = true;
    this.setState({
      amtError : false
    })
    if(this.props.amount < 1){
      this.setState({
        amtError : true
      })
      valid = false;
    }
    if(this.props.tokenId < 0 || this.props.tokenId === ''){
      valid = false;
    }
    return valid
  }

  handleNext(){
    if (this.checkForFields()){
      this.props.togglePage(3)
    }
  }

  handleBack(){
    this.props.togglePage(1)
  }

  render() {
    return (
      <div className="createPage">
        {this.state.loadToEscrow ?        
        <div className="loadingBoxCreate">
          <h6>Sending Prize To Escorow</h6>
          <ReactLoading type={'bubbles'} color={'#7231FC'} height={467} width={175} /> 
        </div> 
        : ''}
        <div className="prizeSelection">
          <p className="bottomText">When you select your prize, it will be hed in escrow while the quest is open.</p>
          <div className="prizeGrid">
            {this.display721s()}
            {this.display20s()}
        </div>
        {erc20s[this.props.network].hasOwnProperty(this.props.selectedPrize) ? 
        <div className="amountRow">
          {this.state.amtError ? <h3 className="errorText" id="amtError">You must enter an amount great than 0.</h3> : ''}
          <h5 id="nftWarning">Enter the amount of tokens you want to lock up as prize.</h5>
          <h4 style={{marginRight:"20px"}}>Amount</h4>
          <input 
            className="createInput" 
            id="amountInput"
            value={this.props.amount}
            type="text" 
            onKeyUp={(event)=>{this.props.instance.setState({amount : event.target.value.replace(/[^\d]+/, '')})}}
            onChange={(event)=>{this.props.instance.setState({amount : event.target.value})}}
          />
        </div>
        : 
        <div className="amountRow">
          <h5 id="nftWarning">Enter the id of the NFT that you own.</h5>
          <h3 style={{marginRight:"20px"}}>Prize Token Id</h3>
            <input 
            className="createInput" 
            id="amountInput"
            value={this.props.tokenId}
            type="text" 
            onKeyUp={(event)=>{this.props.instance.setState({tokenId : event.target.value.replace(/[^\d]+/, '')})}}
            onChange={(event)=>{this.props.instance.setState({tokenId : event.target.value})}}
          />
        </div>  
        }
        </div> 
        <div className="submitWrapper">
          <div className="button" onClick={this.handleNext} id="page2Submit">
            <h6 className="whiteText">Next</h6>
          </div>
          <div className="button" id="page1Back" onClick={this.handleBack}>
            <h6 className="whiteText">Back</h6>
          </div>
        </div>
      </div> 
    );
  }
}

export default CreatePage2;