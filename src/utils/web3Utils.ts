import { getAddress } from '@ethersproject/address/lib'

export function shortenTxId(address: string, chars = 6): string {
  return `${address.substring(0, chars + 2)}...${address.substring(64 - chars)}`
}

// shorten the checksummed version of the input address to have 0x + 4 characters at start and end
export function shortenAddress(address: string, padStart = 4, padEnd = padStart): string {
  const parsed = isAddress(address)
  if (!parsed) throw Error(`Invalid 'address' parameter '${address}'.`)
  return `${parsed.substring(0, padStart + 2)}...${parsed.substring(42 - padEnd)}`
}

export function isAddress(value: any) {
  try {
    return getAddress(value)
  } catch {
    return false
  }
}
