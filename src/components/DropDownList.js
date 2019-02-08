import React, { Component} from "react";
import '../App.scss'
import down from '../assets/img/caret-down.png'
import up from '../assets/img/caret-arrow-up.png'
import cat from '../assets/img/ck.png'
import nfts from '../assets/erc721s.js'

class DropDownList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active : false
    };
    
    this.toggleActive = this.toggleActive.bind(this)
  }


  handleClick = key => e => {
    this.props.add(key)
  }


  populateOptions() {
    return (
      Object.entries(nfts.Main).map((key, i)=> {
          return(
          <div className="optionRow" onClick={this.handleClick(key[0])} key={i}>
            <div className='thirdOfRow'>
              <img src={cat} alt={''} id='optionImage' />
            </div>
            <div className='thirdOfRow'>
              <p className="tickerText">{key[0]}</p>
            </div>
            <div className='thirdOfRow'>
              <p className="selectText">{key[1].name}</p>
            </div>
          </div>
          )
      })
    )
  }

  showDropDown(){
    if(this.state.active){
      return(
        <div className="selectOptions">
          {this.populateOptions()}
        </div>
      )
    }
  }

  toggleActive(){
    this.setState({
      active : !this.state.active
    })
  }

  render() {
    return (
      <div className="dropDownList">
        <div className="selectHeader" onClick={this.toggleActive}>
          <p className="selectText">Select Item...</p>
          <img src={this.state.active ? up : down} alt={''} className="selectDownArrow" />
        </div>
        {this.showDropDown()}
      </div>
    );
  }
}

export default DropDownList;