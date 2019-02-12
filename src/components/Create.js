import React, { Component} from "react";
import '../App.scss'
import DropDownList from './DropDownList.js'
import SelectedReqItem from './SelectedReq.js'
import nfts from '../assets/erc721s.js'
import erc20s from '../assets/erc20s.js'
import cat from '../assets/img/ck.png'

class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step : 1,
      selectedReqs : new Set(),
      selectedPrize : null
    };
    this.add = this.add.bind(this);
    this.remove = this.remove.bind(this)
    this.togglePage = this.togglePage.bind(this)
  }

  async componentWillMount() {

  }

  populateSelectedReqs(){
    let selected = []
    for(let key in nfts.Main){
      if(this.state.selectedReqs.has(key)){
        selected.push(
          <div className="createRow">
          <SelectedReqItem 
            name={nfts.Main[key].name}
            remove={this.remove}
            itemKey = {key}
            key ={''}
          /></div>
          )
      }
    }
    return (
      selected.map((item)=> {
        return (
          item
        )
      })
    )
  }

  displayPrizes(){
    let allTokens = {};
    for (let item in nfts.Main){
      allTokens[item] = nfts[item]
    }
    for (let item in erc20s.Main){
      allTokens[item] = erc20s[item]
    }
    return (
      Object.entries(allTokens).map((item)=>{
        return (
          <div className="prizeCard" key={item[0]}>
            <p className="prizeTokenTicker">{item[0]}</p>
            <img alt={''} src={cat} id="prizePic" />
          </div>
        )
      })
    )
  }

  add(key){
    const old = this.state.selectedReqs;
    const newSet = old.add(key)
    this.setState({
      selectedReqs : newSet
    })
  }

  remove(key){
    const old = this.state.selectedReqs;
    old.delete(key)
    this.setState({
      selectedReqs : old
    })
  }

  selectPage() {
    if(this.state.step === 1){
      return (
        <div className="createPage">
          <div className="headerTextCreate">
            <h6 style={{marginRight:"10px"}}>Create New Quest</h6>
            <h3>Step {this.state.step} of 2</h3>
          </div>
          <div className="createCard">
            <div className="createRow">
              <h3>Quest Title</h3>
              <input className="createInput" id="titleInput"/>
            </div>
          </div>
          <div className="createCard" id="reqSelect">
            <div className="createRow">
              <h3 style={{marginBottom:'20px'}}>Quest Requirements</h3>
            </div>
              {this.populateSelectedReqs()}
            <div className="createRow">
              <DropDownList add={this.add} />
            </div>
            <hr id="createRule"/>
            <p className="bottomText">Users must submit each item in order to complete the quest.</p>
          </div>

          <div className="submitWrapper">
            <div className="pageSubmit" id="page1Submit" onClick={this.togglePage}>
              <h6 className="whiteText">Next Page</h6>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className="createPage">
          <div className="headerTextCreate">
            <div className="" onClick={this.togglePage} id="previousButton">
              <h4 className="">{'<- Previous'}</h4>
            </div>
            <h6 style={{marginRight:"20px"}}>Create New Quest</h6>
            <h3>Step {this.state.step} of 2</h3>
          </div>
          <div className="prizeSelection">
            <h6>Insert Prize</h6>
            <p className="bottomText">When you select your prize, it will be hed in escrow white the quest is open.</p>
            <div className="prizeGrid">
              <div className="prizeCard">
                <p className="prizeTokenTicker">REP</p>
                <img alt={''} src={cat} id="prizePic" />
              </div>
              {this.displayPrizes()}
            </div>
            <div className="amountRow">
              <h4 style={{marginRight:"20px"}}>Amount</h4>
              <input className="createInput" />
            </div>
          </div>
          <div className="submitWrapper">
            <div className="pageSubmit" onClick={this.togglePage} id="page2Submit">
              <h6 className="whiteText">Complete</h6>
            </div>
          </div>
        </div>
      )
    }
  }

  togglePage(){
    if(this.state.step===1 ){
      this.setState({
        step : 2
      })
    } else {
      this.setState({
        step : 1
      })
    }
  }

  render() {
    return (
      this.selectPage()
    );
  }
}

export default Create;