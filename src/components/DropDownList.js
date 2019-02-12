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
    this.setState({
      active : false
    })
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
              <h4>{key[0]}</h4>
            </div>
            <div className='thirdOfRow'>
              <h4>{key[1].name}</h4>
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
          <h4>Select Item...</h4>
          <img src={this.state.active ? up : down} alt={''} className="selectDownArrow" />
        </div>
        {this.showDropDown()}
      </div>
    );
  }
}

export default DropDownList;