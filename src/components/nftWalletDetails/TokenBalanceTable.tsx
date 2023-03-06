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
import { AddressZero } from '@ethersproject/constants'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAccount, useBalance } from 'wagmi'

import useMultiBalance from '@/actions/useMultiBalance'
import { nftWalletsStore, useNftWalletsStore } from '@/store/nftWallet'

import TokenImportButton from './TokenImportButton'
type Props = {
  nftWalletKey: string
}

const TokenBalanceTable = ({ nftWalletKey }: Props) => {
  const { address } = useAccount()
  const walletInfo = nftWalletsStore.get.walletInfo(nftWalletKey)
  const tokens = [...useNftWalletsStore((state) => state.tokenList)]
  const { data: balances } = useMultiBalance({
    address: walletInfo.walletAddress,
    tokens: tokens.map(([, e]) => e.address),
    watch: true,
    staleTime: 5_000,
    enabled: walletInfo.walletAddress !== AddressZero,
  })

  const { data: nativeBalance } = useBalance({
    address: walletInfo.walletAddress,
    watch: true,
  })

  const isOwned = address === walletInfo.ownedBy

  const navigate = useNavigate()

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
        <Tfoot display="flex" p="10px" w="full">
          <Tr>
            <Td>
              <TokenImportButton />
            </Td>
            <Td>
              <Button
                rounded="1.5rem"
                size="sm"
                onClick={() => {
                  navigate(`/nft/transfer/${nftWalletKey}`)
                }}
                isDisabled={!isOwned}
              >
                Transfer with NFT Wallet
              </Button>
            </Td>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  )
}

export default TokenBalanceTable
