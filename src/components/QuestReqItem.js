import React, { Component} from "react";
import '../App.scss'
import ckimg from '../assets/img/ck.png'
import check from '../assets/img/check.png'


class QuestReqItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active : true
    };
  }

  async componentWillMount() {
    this.checkIfOwned()
  }

  async checkIfOwned(){
    if (this.props.balance >0){
      this.setState({
        active : false
      })
    }
  }

  activeStyle(){
    if (this.state.active){
      return 1
    } else {
      return 0.35
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
        <h4 id='reqNameText' style={{opacity : this.activeStyle()}}>{this.props.reqName} ({this.props.balance}/{1})</h4>
      </div>
    );
  }
}

export default QuestReqItem;
