import { Box, Button, Grid, Input } from '@chakra-ui/react'

import AddTokenArea from './components/AddToken'
import TokenInfo from './components/TokenInfo'
import withNFTWalletDeployed from './hoc/withNFTWalletDeployed'
import useNFTWalletOwner from './hooks/useNFTWalletOwner'
import { useNFTWalletStore } from './store'

interface INFTWalletControlPanelProps {
  walletAddress: `0x${string}`
}

function NFTWalletControlPanel({ walletAddress }: INFTWalletControlPanelProps) {
  const { isOwner, isLoading } = useNFTWalletOwner(walletAddress)
  const tokenList = useNFTWalletStore(
    (state) => state.importedTokenList[state.chainId] ?? [],
  )
  const commonActionButtonDisabled = !isOwner

  return (
    <Box>
      <AddTokenArea />
      <Grid gridTemplateColumns="1fr 1fr 1fr">
        {tokenList.map((token) => (
          <TokenInfo
            key={token}
            walletAddress={walletAddress}
            tokenAddress={token as `0x${string}`}
          />
        ))}
      </Grid>
    </Box>
  )
}

export default withNFTWalletDeployed(NFTWalletControlPanel)
