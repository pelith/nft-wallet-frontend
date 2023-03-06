import {
  Box,
  Heading,
  Link,
  Table,
  TableContainer,
  Tbody,
  Td,
  Thead,
  Tr,
} from '@chakra-ui/react'
import React, { useEffect } from 'react'

import {
  transactionHistoryStore,
  useTransactionHistoryStore,
} from '@/store/transactionHistory'

interface IProps {
  nftAddress: `0x${string}`
  nftId: number
}

const NftWalletTransactionDetail = ({ nftAddress, nftId }: IProps) => {
  const history = useTransactionHistoryStore((store) =>
    store.history.get(`${nftAddress}/${nftId}`),
  )

  useEffect(() => {
    if (!history?.length) {
      transactionHistoryStore.set.addTransactionHistory(
        nftAddress,
        nftId,
        '0x9a7de138ede0580c9cb8a5f57b4e44aedcebfe294b50e057d3231f364bcf9882',
      )
    }
  }, [])

  return (
    <Box>
      <Heading>Transaction History</Heading>
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Td>times</Td>
              <Td>hash link</Td>
            </Tr>
          </Thead>
          <Tbody>
            {history?.map((raw) => (
              <Tr key={raw.hash}>
                <Td>{new Date(raw.ts).toLocaleString()}</Td>
                <Td>
                  <Link
                    referrerPolicy="no-referrer"
                    target="_blank"
                    href={`https://ftmscan.com/tx/${raw.hash}`}
                  >{`https://ftmscan.com/tx/${raw.hash}`}</Link>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default NftWalletTransactionDetail
