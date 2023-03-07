export interface TokenInfo {
  name: string
  symbol: string
  decimals: number
  address: `0x${string}`
}
export const tokenList: TokenInfo[] = [
  {
    name: 'fUSDT',
    symbol: 'fUSDT',
    address: '0x049d68029688eAbF473097a2fC38ef61633A3C7A',
    decimals: 6,
  },
]
