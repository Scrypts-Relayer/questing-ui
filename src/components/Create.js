import React, { Component} from "react";
import '../App.scss'
import DropDownList from './DropDownList.js'
import SelectedReqItem from './SelectedReq.js'
import nfts from '../assets/erc721s.js'

class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step : 1,
      selectedReqs : new Set()
    };
    this.add = this.add.bind(this);
    this.remove = this.remove.bind(this)
    this.togglePage = this.togglePage.bind(this)
  }

  async componentWillMount() {

  }

  populateSelectedReqs(){
    let selected = []
    for(let key in nfts.Main){
      if(this.state.selectedReqs.has(key)){
        selected.push(
          <div className="createRow">
          <SelectedReqItem 
            name={nfts.Main[key].name}
            remove={this.remove}
            itemKey = {key}
            key ={''}
          /></div>
          )
      }
    }
    return (
      selected.map((item)=> {
        return (
          item
        )
      })
    )
  }

  add(key){
    const old = this.state.selectedReqs;
    const newSet = old.add(key)
    this.setState({
      selectedReqs : newSet
    })
  }

  remove(key){
    const old = this.state.selectedReqs;
    old.delete(key)
    this.setState({
      selectedReqs : old
    })
  }

  selectPage() {
    if(this.state.step == 1){
      return (
        <div className="createPage">
          <div className="headerTextCreate">
            <p className="createNewText">Create New Quest</p>
            <h6>Step {this.state.step} of 2</h6>
          </div>
          <div className="createCard">
            <div className="createRow">
              <h6>Quest Title</h6>
              <input className="createInput" id="titleInput"/>
            </div>
          </div>
          <div className="createCard" id="reqSelect">
            <div className="createRow">
              <h6 style={{marginBottom:'20px'}}>Quest Requirements</h6>
            </div>
              {this.populateSelectedReqs()}
            <div className="createRow">
              <DropDownList add={this.add} />
              </div>
            
            <hr id="createRule"/>
            <p className="bottomText">Users must submit each item in order to complete the quest.</p>
          </div>

          <div className="submitWrapper">
            <div className="page1Submit" onClick={this.togglePage}>
              <p className="whiteSubmitText whiteText">Next Page</p>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className="createPage">
          <div className="headerTextCreate">
            <p className="createNewText">Create New Quest</p>
            <h6>Step {this.state.step} of 2</h6>
          </div>
        </div>
      )
    }
  }

  togglePage(){
    if(this.state.step ==1 ){
      this.setState({
        step : 2
      })
    } else {
      this.setState({
        step : 1
      })
    }
  }

  render() {
    return (
      this.selectPage()
    );
  }
}

export default Create;