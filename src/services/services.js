import Web3 from 'web3';

import ERC721s from '../assets/erc721s';
import ERC20s from '../assets/erc20s';
import abi721 from '../assets/erc721_abi';
import abi20 from '../assets/erc20_abi';

import CONTRACT from '../assets/contract';
import bin_uint from "./bytecode/bin_uint"
import abi_uint from "./abi/abi_uint"
import bin_str from "./bytecode/bin_str"
import abi_str from "./abi/abi_str"

// async module.exports :
// https://duckduckgo.com/?q=module+export+asynchronous&ia=web
async function setupWeb3(_this) {
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

async function getWeb3() {
  if (typeof window.web3 !== 'undefined') {
    window.ethereum.enable();
    return new Web3(window.web3.currentProvider)
   } else {
     alert('Please use MetaMask!')
   }
}

async function getNetwork(web3) {
    let id = await web3.eth.net.getId();
    let networkName;
    switch (id) {
      case 1:
        networkName = "Main";
        break;
      case 4:
        networkName = "Rinkeby";
        break;
      default:
        networkName = "Unknown";
    }
    return networkName;
}

async function setApproval(_web3, network, address, id, account) {
  try {
    let token_contract = await getContract(_web3, abi721, address)
    await token_contract.methods.approve(CONTRACT[network].address, id).call({from : account})
    console.log(`Successful approval for token id ${id}!`);
  } catch (err) {
    console.log(err);
  }
}

async function getApproval(_web3, network, address, id, account) {
  try {
    let token_contract = await getContract(_web3, abi721, address)
    let res = await token_contract.methods.getApproved(id).call({from : account})
    let ans = CONTRACT[network].address === res
    console.log(`Q: Pursuit is approved for 721 id ${id}? A: ${ans}.`);
  } catch (err) {
    console.log(err);
  }
}

async function getContract(_web3, abi, address) {
  // return new _web3.eth.Contract(abi, address);
  try {
    return new _web3.eth.Contract(abi, address);
  } catch (err) {
    console.log(err);
  }
}

async function getBalancesForAll(_web3, network, account){
  let balanceData = {} // if (typeof balanceData['addr'] === "object") {ERC721} else {ERC20}
  // ERC721s
  // populate output with keys of ERC721 addresses we care about and value []
  for (let key in ERC721s[network]){
    balanceData[ERC721s[network][key].address] = []
  }
  // get all ERC721 assets owned by current account
  account = '0xE98CD5eDA084e71fc1E0b9459EAe0A60a2282045'
  let query = 'https://rinkeby-api.opensea.io/api/v1/assets?owner='+account
  let res = await fetch(query).catch((err) => {alert('im dead inside')})
  let assetData = await res.json()
  // for every token in the list, get user's balance
  let assetSymbol;
  let assetAddres;
  for (const [_, value] of Object.entries(assetData.assets)) {
    assetSymbol = value.asset_contract.symbol;
    assetAddres = value.asset_contract.address;
    if (ERC721s[network].hasOwnProperty(assetSymbol)) {
      balanceData[assetAddres].push(parseInt(value.token_id));
    }
  }
  // ERC20s
  // populate output with keys of ERC20 addresses we care about and value 0
  // for every token in our list, get user's balance
  let token_contract;
  for (const [_, value] of Object.entries(ERC20s[network])) {
    token_contract = await getContract(_web3, abi20, value.address);
    res = await token_contract.methods.balanceOf(account).call({from : account});
    balanceData[value.address] = parseInt(res);
  }
  return balanceData
}

/*
* `data` could be: "name", "image_url"
*/
async function getTokenDataFromAddress(address, data){
  let query = 'https://rinkeby-api.opensea.io/api/v1/asset_contract/' + address
  let res = await fetch(query).catch((err) => {alert('no rinkeby')})
  let formatRes = await res.json()
  return formatRes[data]
}

async function getQuests(web3, network, account){
  let contract = await getContract(web3, CONTRACT[network].abi, CONTRACT[network].address)
  let questId = await contract.methods.getId().call({from : account})
  let allQuests = []
  for (let i =1; i <= questId; i++){
    let quest = await contract.methods.QUESTS(i).call({from : account})
    let reqs = []
    let length = await contract.methods.getQuestsReqLength(i).call({from : account})
    for (let j = 0; j < length; j++){
      let req = await contract.methods.getReqAddress(i, j).call({from : account})
      reqs.push(req)
    }
    //let open = await contract.methods.questExists(i).call();
    let newQuest = {
      reqs : reqs,
      prizeAddress : quest.prizeTokenAddress,
      prizeAmt : quest.prizeTokenAmount,
      prizeTokenId : quest.prizeTokenId,
      id : i
    }
    allQuests.push(newQuest)
  }
  return allQuests
}
/*
* DON'T DELETE
*/
// async function getQuests(start, _limit, net, _web3) {
//   let output = [];
// 	try {
//     let contract = await getContract(_web3, CONTRACT[net].abi, CONTRACT[net].address);
//     let totalQuests = await getTotalQuests(contract);
//     let listedQuests = start;
//     let parsedQuests = start;
//     while (listedQuests < _limit && parsedQuests < totalQuests) {
//       let next = await getAQuest(parsedQuests, net, _web3)
//       let open = await getQuestStatus(parsedQuests, contract)
//       if (open) { output.push(next); listedQuests++ }
//       parsedQuests++;
//     }
// 	} catch (err) {
// 		console.log(err);
// 	}
//   return output;
// }

async function getTotalQuests(_contract) {
  return _contract.questId.call((err, result) => {
    return result ? !err : err;
  });
}

async function getQuestStatus(id, contract) {
  return contract.questExists.call(id, (err, result) => {
    return err ? err : result
  })
  // try {
	// 	let ans = await contract.questExists.call(id, (err, result) => {})
  //   return ans;
	// } catch (err) {
	// 	console.log(err);
	// }
}

async function getAQuest(id, contract) {
  return contract.QUESTS.call(id, (err, result) => {
    return err ? err : result
    //output.push(result2);
    // output.push(id);
    // c++;
  })
  // let output = []
	// try {
  //   contract.QUESTS.call((id) => {
  //     //output.push(result2);
  //     output.push(id);
  //     c++;
  //   })
	// 	return output;
	// } catch (err) {
	// 	console.log(err);
	// }
}

async function createQuest(
  account,
  ourContract,
  prizeTokenAddress,
  prizeTokenId,
  prizeTokenAmount,
  prizeIsNFT,
  requirementsList) {
  ourContract.methods.createQuest(
    prizeTokenAddress,
    prizeTokenId,
    prizeTokenAmount,
    prizeIsNFT,
    requirementsList
   ).send({
    from : account
   }, function(err, res){
    alert('Error in creating the quest!');
  });
}

async function cancelQuest(account, ourContract, questId) {
  ourContract.methods.cancelQuest(questId).send({
    from : account
   }, function(err, res){
    alert('Error in cancelling the quest!');
  });
}

async function completeQuest(account, ourContract, questId, submittedTokenIds) {
  ourContract.methods.completeQuest(questId, submittedTokenIds).send({
    from : account
   }, function(err, res){
    alert('Error in completing the quest!');
  });
}

export { getWeb3, setupWeb3, getNetwork,
  getBalancesForAll, getQuests, getTokenDataFromAddress,
  createQuest, completeQuest, cancelQuest
}



// let readQuest = (_this, qid) => {
//   // Source: https://www.reddit.com/r/ethdev/comments/6us20e/accessing_struct_value_inside_of_map_using_web3/
//   return this.state.contract.QUESTS(qid); // RETURNS AN ARRAY
// }
//
// let checkPrizeLockup = (_this, qid) => {
//   // Source: https://www.reddit.com/r/ethdev/comments/6us20e/accessing_struct_value_inside_of_map_using_web3/
//   return this.readQuest(qid)[1];
// }
// // let checkPrizeLockup = (_this, qid) => {
// //   this.state.contract.methods.checkPrizeLockup(qid).send({
// //      from : this.state.account
// //    }, function(err, res){
// //     alert('Error in checking the prize lockup of the quest!');
// //   });
// // }
//
// let cancelOrder = (_this, qid) => {
//   this.state.contract.methods.cancelOrder(qid).send({
//      from : this.state.account
//    }, function(err, res){
//     alert('Error in canceling the quest!');
//   });
// }

/// ///
/// ///

// let approvePursuit = (_state, tokenTicker, user, tokenId) => {
//   let tokenContract = getContract(
//     _state.web3,
//     ERC721s[_state.net][tokenTicker].abi,
//     ERC721s[_state.net][tokenTicker].address
//   )
//   tokenContract.methods.transferFrom(
//     user,
//     CONTRACT[_state.net].address,
//     tokenId
//    ).send({
//     from: user
//   }, function(err, res){
//     alert('Error in fetching approval the for requisite token!');
//   });
// }

/*
control flow:
1. input text field with 'check' button
2. input text and click 'check' == approvePursuit()
3a. confirmation that we have ownership
3a4. tokenId replaced input text field, can click submit maybe
3a45. submit to transfer ownership, complete quest
3b. 'not yet approved, proceed with transaction? yes or no?'
3b4a. 'no'
3b4b. 'yes'
3b4b5. metamask tx / signature, await txhash
3b4b56. tokenId replaced input text field, can click submit maybe
3b4b567. submit to transfer ownership, complete quest
*/
