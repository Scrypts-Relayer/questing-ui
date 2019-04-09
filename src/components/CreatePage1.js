import React, { Component} from "react";
import '../App.scss'
import DropDownList from '../components/DropDownList'


class CreatePage1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title : '',
      showDropwDown : true
    }
    this.handleNext = this.handleNext.bind(this)
    this.checkForFields = this.checkForFields.bind(this)
  }

  componentDidMount(){
    window.scrollTo(0, 0)
  }

  checkForFields(){
    if(this.props.selectedReqs.size === 0){
      return false
    }
    return true
  }

  handleNext(){   
    if (this.checkForFields()){
      this.props.togglePage(2)
    }
  }

  render() {
    return (
      <div className="createPage">
          <div className="createCard">
            {this.props.titleError ? <h3 className="errorText" id="titleError">Title must not be empty!</h3> : ''}   
            <div className="createRow">
              <div>
              <h3>Quest Title</h3>
              <input 
                className="createInput" 
                id="titleInput" 
                placeholder="Crypto Kittie Scavenger"
                onChange={(event) => {this.setState({title : event.target.value})}}
                value={this.state.title}
              />
              </div>
            </div>
          </div>

          <div className="createCard" id="reqSelect">
            {this.props.reqError ? <h3 className="errorText" id="reqError">You must select at least 1 requirement!</h3> : ''}   
            <div className="createRow">
              {/* <hr id="createRule"/> */}
              <p className="bottomText">Users must submit each item in order to complete the quest.</p>           
            </div>
            <div className="createRow">
              <h3 style={{marginBottom:'20px'}}>Quest Requirements (Max 3)</h3>
            </div>
              {this.props.populateSelectedReqs()}
            <div className="createRow">
              {this.props.showDropwDown ? <DropDownList add={this.props.add} network={this.props.network}/> : ''}
            </div>

          </div>
          <div className="submitWrapper">
            <div className={!this.checkForFields() ? 'button inactiveButton' : 'button'} id="page1Submit" onClick={this.handleNext}>
              <h6 className="whiteText">Next</h6>
            </div>
          </div>
        </div>
    );
  }
}

export default CreatePage1;