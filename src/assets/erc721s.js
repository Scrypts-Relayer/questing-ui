import abi721 from './erc721_abi.js'

const ERC721s = {
  'Main': {
    'CK': {
      'name': 'Cryptokitties',
      'address': '0x06012c8cf97BEaD5deAe237070F9587f8E7A266d',
      'abi': abi721
    },
    'LAND': {
      'name': 'Decentraland',
      'address': '0xF87E31492Faf9A91B02Ee0dEAAd50d51d56D5d4d',
      'abi': abi721
    },
    'TKT': {
      'name': 'Eth Tickets',
      'address': '0xf5BecD11b4FBd4FB2988cA7302DB25577cE4b36A',
      'abi': abi721
    },
    'MLBCB': {
      'name': 'MLBCoin',
      'address': '0x8c9b261Faef3b3C2e64ab5E58e04615F8c788099',
      'abi': abi721
    },
    'MCS': {
      'name': 'MarbleCards',
      'address': '',
      'abi': abi721
    },
    'EMJ': {
      'name': 'Ethmoji',
      'address': '0xA6d954d08877f8ce1224f6BFb83484c7D3aBF8E9',
      'abi': abi721
    }
  },


  'Rinkeby': {
    'KITTYR': {
      'name': 'Crypto Kitties RB',
      'address': '0x16baf0de678e52367adc69fd067e5edd1d33e3bf',
      'abi': abi721
    }
  }
}

export default ERC721s;
