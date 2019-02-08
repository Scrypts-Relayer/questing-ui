import React, { Component} from "react";
import '../App.scss'
import ckimg from '../assets/img/ck.png'
import check from '../assets/img/check.png'


class QuestReqItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active : this.props.active
    };
  }

  async componentWillMount() {

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
        <h4 id='reqNameText' style={{opacity : this.activeStyle()}}>{this.props.reqName} ({this.props.amt}/{this.props.total})</h4>
        {this.displayIdInput()}
        <div className="reqSubmit" style={{opacity:this.activeStyle()}}>
          <h5 className="whiteText">Submit</h5>
        </div>
      </div>
    );
  }
}

export default QuestReqItem;
