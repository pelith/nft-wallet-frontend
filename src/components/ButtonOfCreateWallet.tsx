import { Button } from '@chakra-ui/react'

import useCreateWallet from '@/hooks/useCreateWallet'
interface IButtonOfCreateWalletProps {
  nftAddress: string
  nftIndex: number
}

export default function ButtonOfCreateWallet({
  nftAddress,
  nftIndex,
}: IButtonOfCreateWalletProps) {
  const { createNFTWallet, isSuccess, isLoading } = useCreateWallet(nftAddress, nftIndex)

  return (
    <Button
      onClick={createNFTWallet}
      isLoading={isLoading}
      isDisabled={isSuccess || isLoading}
    >
      create wallet
    </Button>
  )
}
