import { JsonFragment } from '@ethersproject/abi'
import { Contract as MulticallContract } from '@pelith/ethers-multicall'

const instance = new Map<string, MulticallContract>()

export function getMulticallContract<T extends JsonFragment[]>(abi: T, address?: string) {
  if (!address) {
    return new MulticallContract(address, abi)
  }
  if (instance.has(address)) return instance.get(address)!
  instance.set(address, new MulticallContract(address, abi))
  return instance.get(address)!
}
