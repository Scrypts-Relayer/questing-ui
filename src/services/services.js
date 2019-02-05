import Web3 from 'web3';
import React from 'react';

// import Web3 from 'web3';


// async module.exports :
// https://duckduckgo.com/?q=module+export+asynchronous&ia=web
export async function setupWeb3(_this) {
  if (typeof window.web3 !== 'undefined') {
    window.ethereum.enable();
    _this.setState({
      web3 : new Web3(window.web3.currentProvider),
    })
   } else {
     alert('Please use MetaMask!')
     // ganache whatever or force them to use metamask
   }
}

// PASS THIS IN AS PROP IN LIEU OF WEB3PROVIDER ??
let checkForMetaMask = () => {
  if (this.state.isConnected){
    return (
      <div className="container">
      <div className="button" id="b1" onClick={this.increase}>
        <p>Click to increase balance</p>
      </div>
      <div className="button" id="b2" onClick={this.getBalance}>
        <p>Click to get balance</p>
      </div>
    </div>
    )
  } else {
    return (
      <div>
        <p>Connect to metamask</p>
      </div>
    )
  }
}

let createQuest = (_this) => {
  this.state.contract.methods.createQuest(
     // uint qid,
     // uint[] memory _submittedTokenIds
   ).send({
    from : this.state.account
   }, function(err, res){
    alert('Error in creating the quest!');
  });
}

let readQuest = (_this, qid) => {
  // Source: https://www.reddit.com/r/ethdev/comments/6us20e/accessing_struct_value_inside_of_map_using_web3/
  return this.state.contract.QUESTS(qid); // RETURNS AN ARRAY
}

let checkPrizeLockup = (_this, qid) => {
  // Source: https://www.reddit.com/r/ethdev/comments/6us20e/accessing_struct_value_inside_of_map_using_web3/
  return this.readQuest(qid)[1];
}
// let checkPrizeLockup = (_this, qid) => {
//   this.state.contract.methods.checkPrizeLockup(qid).send({
//      from : this.state.account
//    }, function(err, res){
//     alert('Error in checking the prize lockup of the quest!');
//   });
// }

let cancelOrder = (_this, qid) => {
  this.state.contract.methods.cancelOrder(qid).send({
     from : this.state.account
   }, function(err, res){
    alert('Error in canceling the quest!');
  });
}
