import React, { Component, Fragment } from "react";
import '../App.scss'
import QuestReqItem from './QuestReqItem'

class QuestCard extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  async componentWillMount() {

  }

  render() {
    return (
      <div className="questCard">
        <div className="qcardLeft">
          <h4>Reward</h4>
          <h4 id='rwdText'>{this.props.amt} {this.props.rwdName}</h4>
        </div>
        <div className="qcardMiddle">
          <QuestReqItem />
          <QuestReqItem />
          <QuestReqItem />
        </div>
        <div className="qcardRight">
        </div>
      </div>
    );
  }
}

export default QuestCard;
