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

import { useTransactionHistoryStore } from '@/store/transactionHistory'

import BannerHeading from '../BannerHeading'

interface IProps {
  nftAddress: `0x${string}`
  nftId: number
}

const NftWalletTransactionDetail = ({ nftAddress, nftId }: IProps) => {
  const history = useTransactionHistoryStore((store) =>
    store.history.get(`${nftAddress}/${nftId}`),
  )

  return (
    <Box>
      <BannerHeading>Transaction History</BannerHeading>
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
