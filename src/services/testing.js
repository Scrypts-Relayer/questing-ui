import fakeNFT from '../assets/fakeNFT'

export async function getFake(web3){
  try {
    return new web3.eth.Contract(fakeNFT['Rinkeby'].abi, fakeNFT['Rinkeby'].address);
  } catch (err) {
    console.log(err);
  }
}