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

let thex = 0;

export async function mintToMe(web3, account, x){
    let instance =  await new web3.eth.Contract(fakeNFT['Rinkeby'].abi, fakeNFT['Rinkeby'].address);
    console.log(instance)
  // console.log(account)
    // thex = x
    // await instance.methods.mint(account, x).send({from: account})
    // await instance.methods.mint(account, x+1).send({from: account})
    // //let balance = await instance.methods.getApproved(43).call()
    // //console.log(balance)
    // console.log('done 1')
}

export async function addMinter(web3, account){
  let instance =  await new web3.eth.Contract(fakeNFT['Rinkeby'].abi, fakeNFT['Rinkeby'].address);
  await instance.methods.addMinter('0x76cD09Fd114ce95bf0D81422A0959316FD7F6B1B').send({from : account})

}

export async function transferEscrow(web3, account){
  let instance =  await new web3.eth.Contract(fakeNFT['Rinkeby'].abi, fakeNFT['Rinkeby'].address);
  await instance.methods.approve(CONTRACT['Rinkeby'].address, 80).send({from : account})
  await instance.methods.approve(CONTRACT['Rinkeby'].address, 81).send({from : account})
}

export async function checkOwner(id, web3){
  let instance =  await new web3.eth.Contract(fakeNFT['Rinkeby'].abi, fakeNFT['Rinkeby'].address);
  let a = await instance.methods.ownerOf(80).call()
  let b = await instance.methods.ownerOf(81).call()
  console.log(id, 'owner of 80', a)
  console.log(id, 'owner of 81', b)
}
