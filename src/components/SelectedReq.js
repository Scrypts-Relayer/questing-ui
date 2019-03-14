import React, { Component} from "react";
import '../App.scss'
import cat from '../assets/img/ck.png'
import xIcon from '../assets/img/letter-x.png'

class SelectedReqItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step : 1,
      selectedReqs : new Set()
    };
    this.handleClick = this.handleClick.bind(this)
  }

  async componentWillMount() {

  }

  handleClick() {
    this.props.remove(this.props.itemKey)
  }

  render() {
    return (
      <div className="selectedReqItem">
        <img src={cat} alt={''} id='optionImage' />
        <h3 id="selectedItemName">1 {this.props.name}</h3>
        <img src={xIcon} alt={''} id="xIcon" onClick={this.handleClick}/>
      </div>
      );
  }
}

export default SelectedReqItem;