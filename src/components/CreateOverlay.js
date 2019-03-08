import React, { Component} from "react";
import '../App.scss'
import down from '../assets/img/caret-down.png'
import up from '../assets/img/caret-arrow-up.png'
import cat from '../assets/img/ck.png'
import nfts from '../assets/erc721s.js'

class CreateOverlay extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div className="overLayBox">

      </div>
    );
  }
}

export default CreateOverlay;