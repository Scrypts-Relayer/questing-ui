import React, { Component} from "react";
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
          <QuestReqItem 
            reqName={this.props.reqName}
            amt={1}
            active={true}
            total={1}
          />
          <QuestReqItem 
            reqName={this.props.reqName}
            amt={0}
            active={true}
            total={1}/>
          <QuestReqItem 
            reqName={this.props.reqName}
            amt={1}
            active={false}
            total={1}
          />
        </div>
        <div className="qcardRight">
          <div className="questSubmit">
            <h4 className="whiteText">Submit</h4>
          </div>
          <p id="questIdText">questID : {this.props.id}</p>
        </div>
      </div>
    );
  }
}

export default QuestCard;
