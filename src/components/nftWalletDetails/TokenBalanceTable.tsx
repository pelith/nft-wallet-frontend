import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import React from 'react'

type Props = {
  tokenList: { name: string; balance: number }[]
}

const TokenBalanceTable = ({ tokenList }: Props) => {
  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Token</Th>
            <Th>Balance</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            {tokenList.map((tokenBalance) => {
              return (
                <>
                  <Td>{tokenBalance.name}</Td>
                  <Td>{tokenBalance.balance}</Td>
                </>
              )
            })}
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  )
}

export default TokenBalanceTable
