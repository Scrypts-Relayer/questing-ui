import fakeNFT from '../assets/fakeNFT'
import CONTRACT from '../assets/contract'

export async function checkApproval(web3, account, x){
  let instance =  await new web3.eth.Contract(fakeNFT['Rinkeby'].abi, fakeNFT['Rinkeby'].address);
  let a = await instance.methods.getApproved(x).call({from : account})
  console.log(a + ' is approved for ' + x)
}

export async function mintToMe(web3, account, x){
  let instance =  await new web3.eth.Contract(fakeNFT['Rinkeby'].abi, fakeNFT['Rinkeby'].address);
  await instance.methods.mint(account, x).send({from: account})
  let balance = await instance.methods.ownerOf(x).call()
  console.log(balance + " is the owner of " + x + ' now')
}

export async function transferEscrow(web3, account, x){
  let instance =  await new web3.eth.Contract(fakeNFT['Rinkeby'].abi, fakeNFT['Rinkeby'].address);
  await instance.methods.approve(CONTRACT['Rinkeby'].address, x).send({from : account})
}

export async function checkOwner(web3, x){
  let instance =  await new web3.eth.Contract(fakeNFT['Rinkeby'].abi, fakeNFT['Rinkeby'].address);
  let a = await instance.methods.ownerOf(x).call()
  console.log('owner of ' + x + ' is ' + a)

}
