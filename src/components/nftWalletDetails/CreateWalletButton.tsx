import { Button } from '@chakra-ui/react'

import useCreateWallet from '@/hooks/useCreateWallet'

interface IProps {
  nftAddress: string
  nftId: number
}
export default function CreateWalletButton({ nftAddress, nftId }: IProps) {
  const { isLoading, isSuccess, data, createNFTWallet } = useCreateWallet(
    nftAddress,
    nftId,
  )
  return (
    <Button
      onClick={createNFTWallet}
      isLoading={isLoading}
      size="sm"
      isDisabled={isSuccess || !!data?.hash}
    >
      Create Wallet
    </Button>
  )
}
