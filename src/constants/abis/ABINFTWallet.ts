export default [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'caller',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'target',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'value',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'data',
        type: 'bytes',
      },
    ],
    name: 'Executed',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_target',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_value',
        type: 'uint256',
      },
      {
        internalType: 'bytes',
        name: '_data',
        type: 'bytes',
      },
    ],
    name: 'execute',
    outputs: [
      {
        internalType: 'bytes',
        name: '_result',
        type: 'bytes',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'index',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_nft',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_index',
        type: 'uint256',
      },
    ],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: '_hash',
        type: 'bytes32',
      },
      {
        internalType: 'bytes',
        name: '_signature',
        type: 'bytes',
      },
    ],
    name: 'isValidSignature',
    outputs: [
      {
        internalType: 'bytes4',
        name: '',
        type: 'bytes4',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'nft',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    stateMutability: 'payable',
    type: 'receive',
  },
] as const
