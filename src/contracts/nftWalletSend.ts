import { MaxUint256 } from '@ethersproject/constants'
import { prepareWriteContract } from '@wagmi/core'
import { erc20ABI, erc721ABI } from 'wagmi'
export default function nftWalletSend() {
  const config = prepareWriteContract({
    abi: erc20ABI,
    address: '0x11',
    functionName: 'approve',
    args: ['0x11', MaxUint256],
  })
}
