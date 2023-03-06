import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
} from '@chakra-ui/react'
import { AddressZero, Zero } from '@ethersproject/constants'
import { parseUnits } from '@ethersproject/units'
import { BigNumber } from 'ethers'
import { useMemo, useState } from 'react'
import { useAccount } from 'wagmi'

import AddTokenArea from './components/AddToken'
import DisperseTokenModal from './components/DisperseToken'
import NumericalInput from './components/NumericalInput'
import TokenInfo from './components/TokenInfo'
import withNFTWalletDeployed from './hoc/withNFTWalletDeployed'
import useNFTWalletOwner from './hooks/useNFTWalletOwner'
import useTokenTransfer from './hooks/useTokenTransfer'
import { useNFTWalletStore } from './store'
import { cutInputToDecimal } from './utils'
import { isAddress } from './utils/web3Utils'

interface INFTWalletControlPanelProps {
  NFTWalletAddress: `0x${string}`
}

function NFTWalletControlPanel({
  NFTWalletAddress: walletAddress,
}: INFTWalletControlPanelProps) {
  const { ownedBy } = useNFTWalletOwner(walletAddress)
  const { address } = useAccount()
  const tokenList = useNFTWalletStore(
    (state) => state.importedTokenList[state.chainId] ?? [],
  )
  const commonActionButtonDisabled = ownedBy !== address

  const [selectedInfo, setSelectedInfo] = useState<{
    tokenAddress?: `0x${string}`
    balance: BigNumber
    symbol: string
    formatted: string
    decimals: number
  }>({
    tokenAddress: undefined as undefined | `0x${string}`,
    balance: Zero,
    symbol: '',
    formatted: '',
    decimals: 18,
  })

  const [inputValue, setInputValue] = useState('')
  const [targetWallet, setTargetValue] = useState('')

  const safeInput = cutInputToDecimal(inputValue, selectedInfo.decimals)
  const safeInputBigNumber = useMemo(
    () => parseUnits(safeInput || '0', selectedInfo.decimals),
    [safeInput, selectedInfo.decimals],
  )

  const usedTokenAddress = isAddress(selectedInfo.tokenAddress) || undefined
  const usedTargetWallet = isAddress(targetWallet) || AddressZero

  const { transfer, isLoading } = useTokenTransfer(
    { walletAddress, nftAddress: usedTargetWallet, nftId: safeInputBigNumber, targetWallet: usedTokenAddress },
  )

  const transferButtonDisabled =
    commonActionButtonDisabled ||
    isLoading ||
    selectedInfo.balance.lt(safeInputBigNumber) ||
    selectedInfo.balance.eq(Zero) ||
    usedTargetWallet === AddressZero

  return (
    <Box>
      <Text>Wallet Address: {walletAddress} </Text>
      {ownedBy ? (
        <Alert status="success">
          <AlertIcon />
          you are the owner of this NFT wallet
        </Alert>
      ) : (
        <Alert status="error">
          <AlertIcon />
          you are not the owner of this NFT wallet
        </Alert>
      )}
      {ownedBy && <DisperseTokenModal NFTWalletAddress={walletAddress} />}
      <FormControl>
        <FormLabel>transfer target</FormLabel>
        <Input
          value={targetWallet}
          isDisabled={commonActionButtonDisabled}
          onInput={(e) => setTargetValue(e.currentTarget.value)}
        />
      </FormControl>
      <FormControl>
        <FormLabel>balance: {selectedInfo.formatted}</FormLabel>
        <NumericalInput
          onUserInput={setInputValue}
          value={inputValue}
          isDisabled={commonActionButtonDisabled}
          decimals={selectedInfo.decimals}
          placeholder="0.0"
        />
        <Button onClick={() => setInputValue(selectedInfo.formatted)}>Max</Button>
      </FormControl>
      <Button
        isLoading={isLoading}
        isDisabled={transferButtonDisabled}
        onClick={transfer}
      >
        Confirm to transfer
      </Button>
      <AddTokenArea />
      <Flex flexDir="column">
        <TokenInfo
          onSelect={setSelectedInfo}
          selected={selectedInfo.tokenAddress === undefined}
          walletAddress={walletAddress}
        />
        {tokenList.map((token) => (
          <TokenInfo
            onSelect={setSelectedInfo}
            selected={token === selectedInfo.tokenAddress}
            key={token}
            walletAddress={walletAddress}
            tokenAddress={token as `0x${string}`}
          />
        ))}
      </Flex>
    </Box>
  )
}

export default withNFTWalletDeployed(NFTWalletControlPanel)
