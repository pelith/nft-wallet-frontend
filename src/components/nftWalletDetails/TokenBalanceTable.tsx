import {
  Button,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tooltip,
  Tr,
} from '@chakra-ui/react'
import React from 'react'
import { useBalance } from 'wagmi'

import useMultiBalance from '@/actions/useMultiBalance'
import { nftWalletsStore, useNftWalletsStore } from '@/store/nftWallet'

import TokenImportButton from './TokenImportButton'
type Props = {
  nftWalletKey: string
}

const TokenBalanceTable = ({ nftWalletKey }: Props) => {
  const walletInfo = nftWalletsStore.get.walletInfo(nftWalletKey)
  const tokens = [...useNftWalletsStore((state) => state.tokenList)]
  const { data: balances } = useMultiBalance({
    address: walletInfo.walletAddress,
    tokens: tokens.map(([, e]) => e.address),
    watch: true,
    staleTime: 5_000,
  })

  const { data: nativeBalance } = useBalance({
    address: walletInfo.walletAddress,
    watch: true,
  })

  return (
    <TableContainer>
      <Table className="data-table" variant="simple">
        <Thead>
          <Tr>
            <Th>Token</Th>
            <Th>Balance</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>{nativeBalance?.symbol}</Td>
            <Td>{nativeBalance?.formatted}</Td>
          </Tr>
          {balances?.map((tokenBalance, i) => {
            return (
              <Tr key={tokenBalance.symbol}>
                <Tooltip label={`${tokens[i]?.[1]?.address || ''}`}>
                  <Td>{tokenBalance.symbol}</Td>
                </Tooltip>
                <Td>{tokenBalance.formatted}</Td>
              </Tr>
            )
          })}
        </Tbody>
        <Tfoot display="flex" p="10px" justifyContent="space-around" w="full">
          <TokenImportButton />
          <Button rounded="1.5rem" size="sm">
            Transfer with NFT Wallet
          </Button>
        </Tfoot>
      </Table>
    </TableContainer>
  )
}

export default TokenBalanceTable
