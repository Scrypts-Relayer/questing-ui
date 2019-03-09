import fakeNFT from '../assets/fakeNFT'
import erc721abi from '../assets/erc721_abi'
import CONTRACT from '../assets/contract'

export async function getFake(web3){
  try {
    return new web3.eth.Contract(fakeNFT['Rinkeby'].abi, fakeNFT['Rinkeby'].address);
  } catch (err) {
    console.log(err);
  }
}

export async function mintToMe(web3, account, x){
  let instance =  await new web3.eth.Contract(fakeNFT['Rinkeby'].abi, fakeNFT['Rinkeby'].address);
    console.log(instance)
  // console.log(account)
    await instance.methods.mint(account, x).send({from: account})
    // await instance.methods.mint(account, x+1).send({from: account})
    //let balance = await instance.methods.getApproved(43).call()
    //console.log(balance)
    console.log('done', x)
}

export async function transferEscrow(web3, account, x){
  let instance =  await new web3.eth.Contract(fakeNFT['Rinkeby'].abi, fakeNFT['Rinkeby'].address);
  await instance.methods.approve(CONTRACT['Rinkeby'].address, x).send({from : account})
}

export async function checkOwner(id, web3, x){
  let instance =  await new web3.eth.Contract(fakeNFT['Rinkeby'].abi, fakeNFT['Rinkeby'].address);
  let a = await instance.methods.ownerOf(x).call()
  let b = await instance.methods.ownerOf(x+1).call()
  console.log(id, 'owner of x', a)
  console.log(id, 'owner of x+1', b)
}
