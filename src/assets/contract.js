const CONTRACT = {
  'Main': {
    'address': '',
    'abi': []
  },
  'Rinkeby': {
    'address': '0xc0236eEd0818542F4b8F83B24f4d3649054670dF',
    'abi': [
      {
        "constant": true,
        "inputs": [],
        "name": "questId",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0x44a22c36"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "QUESTS",
        "outputs": [
          {
            "name": "id",
            "type": "uint256"
          },
          {
            "name": "prizeTokenAddress",
            "type": "address"
          },
          {
            "name": "prizeTokenId",
            "type": "uint256"
          },
          {
            "name": "prizeTokenAmount",
            "type": "uint256"
          },
          {
            "name": "prizeIsNFT",
            "type": "bool"
          },
          {
            "name": "creator",
            "type": "address"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0x4de637cc"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "ids",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0xfac333ac"
      },
      {
        "inputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor",
        "signature": "constructor"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "name": "_questId",
            "type": "uint256"
          },
          {
            "indexed": true,
            "name": "_creator",
            "type": "address"
          }
        ],
        "name": "QuestCreated",
        "type": "event",
        "signature": "0x265711dffb2100716e957f1a6a8f230bd41e3c50d54f861eda7ba55f1ccc3cc2"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "name": "_questId",
            "type": "uint256"
          },
          {
            "indexed": true,
            "name": "_completer",
            "type": "address"
          }
        ],
        "name": "QuestCompleted",
        "type": "event",
        "signature": "0x1f830b1eb1d06c99fa9684f55e907da9251648000c05474005094c53869dbf60"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "name": "_questId",
            "type": "uint256"
          },
          {
            "indexed": false,
            "name": "_open",
            "type": "bool"
          }
        ],
        "name": "toggleQuestOpem",
        "type": "event",
        "signature": "0x6308042b38639e720c03740e9a3c5ed447243f3f9a684b96c44eb3f62f7d43ca"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "getId",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0x5d1ca631"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "id",
            "type": "uint256"
          }
        ],
        "name": "getQuestsReqLength",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0x9ce45c7b"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "id",
            "type": "uint256"
          },
          {
            "name": "index",
            "type": "uint256"
          }
        ],
        "name": "getReqAddress",
        "outputs": [
          {
            "name": "",
            "type": "address"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0x30b1de4e"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "_prizeTokenAddress",
            "type": "address"
          },
          {
            "name": "_prizeTokenId",
            "type": "uint256"
          },
          {
            "name": "_prizeTokenAmount",
            "type": "uint256"
          },
          {
            "name": "_prizeIsNFT",
            "type": "bool"
          },
          {
            "name": "_requirementsList",
            "type": "address[]"
          }
        ],
        "name": "createQuest",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function",
        "signature": "0x5014fcd4"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "_questId",
            "type": "uint256"
          }
        ],
        "name": "cancelQuest",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function",
        "signature": "0xfe90ff7d"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "_tokenAddress",
            "type": "address"
          }
        ],
        "name": "checkRequiremnetLockup",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function",
        "signature": "0x0a028476"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "_questId",
            "type": "uint256"
          },
          {
            "name": "_submittedTokenIds",
            "type": "uint256[]"
          }
        ],
        "name": "completeQuest",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function",
        "signature": "0x870de6bd"
      }
    ]
  }
}

export default CONTRACT;
