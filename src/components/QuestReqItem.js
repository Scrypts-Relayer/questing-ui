import React, { Component} from "react";
import '../App.scss'

class QuestReqItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active : true
    };
  }

  async componentWillMount() {

  }

  toggleActive() {
    this.setState({
      active : !this.state.active
    })
  }

  render() {
    return (
      <div className="questReqItem">

      </div>
    );
  }
}

export default QuestReqItem;
