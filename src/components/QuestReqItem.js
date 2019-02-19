import React, { Component} from "react";
import '../App.scss'
import ckimg from '../assets/img/ck.png'
import check from '../assets/img/check.png'
import nfts from '../assets/erc721s.js'
import {getUserBalanceOfERC721} from '../services/services.js'


class QuestReqItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active : true,
      reqBalance : 0
    };
  }

  async componentWillMount() {
    this.checkIfOwned()
  }

  async checkIfOwned(){
    let key = this.props.reqKey
    let balance = 0
    balance = await getUserBalanceOfERC721(nfts.Rinkeby[key].address, this.props.net);
    if (balance >0){
      this.setState({
        active : false,
        reqBalance : balance
      })
    }
  }

  toggleActive() {
    this.setState({
      active : !this.state.active
    })
  }

  activeStyle(){
    if (this.state.active){
      return 1
    } else {
      return 0.35
    }
  }

  displayIdInput() {
    if(this.state.active){
      return (
        <input placeholder={'TokenId'} className="reqIdInput"/>
      )
    } else {
      return <p style={{fontSize: '12px'}} className="tokenIdtext">tokenID: 655</p>
    }
  }

  displayCheck() {
    if(this.state.active){
      return (
        ''
      )
    } else {
      return (
        <img src={check} alt={''} className="reqCheck" />
      )
    }
  }

  render() {
    return (
      <div className="questReqItem">
        {this.displayCheck()}
        <img src={ckimg} className="reqPic" style={{opacity : this.activeStyle()}} alt={''} />
        <h4 id='reqNameText' style={{opacity : this.activeStyle()}}>{this.props.reqName} ({this.state.reqBalance}/{1})</h4>
        {/* {this.displayIdInput()}
        <div className="reqSubmit" style={{opacity:this.activeStyle()}}>
          <h4 className="whiteText">Submit</h4>
        </div> */}
      </div>
    );
  }
}

export default QuestReqItem;
