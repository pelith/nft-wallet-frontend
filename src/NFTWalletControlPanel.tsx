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
import { useMemo, useState } from 'react'

import AddTokenArea from './components/AddToken'
import NumericalInput from './components/NumericalInput'
import TokenInfo from './components/TokenInfo'
import withNFTWalletDeployed from './hoc/withNFTWalletDeployed'
import useNFTWalletOwner from './hooks/useNFTWalletOwner'
import useTokenTransfer from './hooks/useTokenTransfer'
import { useNFTWalletStore } from './store'
import { cutInputToDecimal } from './utils'
import { isAddress } from './utils/web3Utils'

interface INFTWalletControlPanelProps {
  walletAddress: `0x${string}`
}

function NFTWalletControlPanel({ walletAddress }: INFTWalletControlPanelProps) {
  const { isOwner } = useNFTWalletOwner(walletAddress)
  const tokenList = useNFTWalletStore(
    (state) => state.importedTokenList[state.chainId] ?? [],
  )
  const commonActionButtonDisabled = !isOwner

  const [selectedInfo, setSelectedInfo] = useState({
    tokenAddress: AddressZero,
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

  const usedTokenAddress = isAddress(selectedInfo.tokenAddress) || AddressZero
  const usedTargetWallet = isAddress(targetWallet) || AddressZero

  const { transfer, isLoading } = useTokenTransfer(
    walletAddress,
    usedTokenAddress,
    usedTargetWallet,
    safeInputBigNumber,
  )

  const transferButtonDisabled =
    commonActionButtonDisabled ||
    isLoading ||
    selectedInfo.balance.lt(safeInputBigNumber) ||
    usedTokenAddress === AddressZero ||
    usedTargetWallet === AddressZero

  return (
    <Box>
      <Text>Wallet Address: {walletAddress} </Text>
      {isOwner ? (
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
