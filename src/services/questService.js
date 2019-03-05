import ERC721s from '../assets/erc721s';
import ERC20s from '../assets/erc20s';
import abi721 from '../assets/erc721_abi';
// import abi20 from '../assets/erc20_abi';

import CONTRACT from '../assets/contract';
// import bin_uint from "./bytecode/bin_uint"
// import abi_uint from "./abi/abi_uint"
// import bin_str from "./bytecode/bin_str"
// import abi_str from "./abi/abi_str"


export async function setApproval(_web3, network, address, id, account) {
  try {
    let token_contract = await getContract(_web3, abi721, address)
    await token_contract.methods.approve(CONTRACT[network].address, id).call({from : account})
    console.log(`Successful approval for token id ${id}!`);
  } catch (err) {
    console.log(err);
  }
}

export async function getApproval(_web3, network, address, id, account) {
  try {
    let token_contract = await getContract(_web3, abi721, address)
    console.log(token_contract.methods)
    let res = await token_contract.methods.ownerOf(id).call({from : account})
    console.log(res);
  } catch (err) {
    console.log(err);
  }
}

export async function getContract(_web3, abi, address) {
  // return new _web3.eth.Contract(abi, address);
  try {
    return new _web3.eth.Contract(abi, address);
  } catch (err) {
    console.log(err);
  }
}


export async function getBalancesForAll(_web3, network, account){
  let balanceData = {} // if (typeof balanceData['addr'] === "object") {ERC721} else {ERC20}
  // ERC721s
  // populate with keys and value []
  for (let key in ERC721s[network]){
    balanceData[ERC721s[network][key].address] = []
  }
  // get all ERC721 assets owned by current account
  let query = 'https://rinkeby-api.opensea.io/api/v1/assets?owner='+account+'&api_key=e4f5e442e7664e3eb56fd7c415cf6128'
  let res = await fetch(query).catch((err) => {alert('im dead inside')})
  let assetData = await res.json()
  // for every token in the list, get user's balance
  let assetSymbol;
  let assetAddres;
  for (let key in assetData.assets) {
    assetSymbol = assetData.assets[key].asset_contract.symbol;
    assetAddres = assetData.assets[key].asset_contract.address;
    if (ERC721s[network].hasOwnProperty(assetSymbol)) {
      balanceData[assetAddres].push(parseInt(assetData.assets[key].token_id));
    }
  }
  // // ERC20s
  // let addrs = [];
  // for (const [_, value] of Object.entries(ERC20s[network])) {
  //   balanceData[value.address] = 0;
  //   addrs.push(value.address);
  // }
  // let token_contract;
  // for(let i = 0; i < addrs.length; i++) {
  //   token_contract = await getContract(_web3, abi20, addrs[i]);
  //   res = await token_contract.methods.balanceOf(account).call({from : account});
  //   balanceData[assetAddres] = parseInt(res);
    
  // }
  return balanceData
}

/*
* `data` could be: "name", "image_url"
*/
export async function getTokenDataFromAddress(address){
  let query = 'https://rinkeby-api.opensea.io/api/v1/asset/' + address + '/972'
  let res = await fetch(query).catch((err) => {alert('no rinkeby')})
  let formatRes = await res.json()
  return formatRes
}

export function getPrizeName(address, network){
  let name = 'Prize token name not found'
  for(let nft in ERC721s[network]){
    let k1 = ERC721s[network][nft].address
    let k2 = address.toLowerCase()
    if(k1 === k2){
      name = ERC721s[network][nft].name
    }
  }
  for(let token in ERC20s[network]){
    let k1 = ERC20s[network][token].address
    let k2 = address.toLowerCase()
    if(k1 === k2){
      name = ERC20s[network][token].name
    }
  }
  return name;
}

export async function getQuests(web3, network, account){
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
      prizeName : getPrizeName(quest.prizeTokenAddress, network),
      prizeAmt : quest.prizeTokenAmount,
      prizeTokenId : quest.prizeTokenId,
      id : i
    }
    allQuests.push(newQuest)
  }
  return allQuests
}

export async function createQuest(
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

export async function cancelQuest(account, ourContract, questId) {
  ourContract.methods.cancelQuest(questId).send({
    from : account
   }, function(err, res){
    alert('Error in cancelling the quest!');
  });
}

export async function completeQuest(account, ourContract, questId, submittedTokenIds) {
  ourContract.methods.completeQuest(questId, submittedTokenIds).send({
    from : account
   }, function(err, res){
    alert('Error in completing the quest!');
  });
}


