import { Box, ButtonProps, Spinner } from '@chakra-ui/react'
import { BigNumber } from 'ethers'
import omit from 'lodash/omit'
import type { ComponentType } from 'react'

import { ApprovalState } from '@/constants/ApprovalState'
import useTokenApprove from '@/hooks/useTokenApprove'
import { isAddress } from '@/utils/web3Utils'
export interface ApproveTokenCheckWrapperInterface extends ButtonProps {
  tokenAddress: string
  spender: string
  requiredAllowance: BigNumber
  NFTWalletAddress?: string
}

export default function withApproveTokenCheckWrapper<
  T extends ApproveTokenCheckWrapperInterface,
>(WrappedComponent: ComponentType<ButtonProps>, NotApproveRender?: ComponentType<{}>) {
  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component'

  const ComponentWithTokenApproval = (props: T) => {
    const {
      tokenAddress,
      spender,
      requiredAllowance,
      onClick,
      children,
      disabled,
      isDisabled: isDisabled_,
      NFTWalletAddress,
    } = props

    const { approve, approvalState } = useTokenApprove({
      tokenAddress: tokenAddress as `0x${string}`,
      requiredAllowance,
      spender: spender as `0x${string}`,
      NFTWalletAddress: isAddress(NFTWalletAddress) || undefined,
    })

    const isPending = approvalState === ApprovalState.LOADING
    const isApproved = approvalState === ApprovalState.APPROVED
    const isDisabled = disabled || isDisabled_
    const handleClick = isApproved
      ? onClick
      : () => {
          console.log('approve')
          approve?.()
        }
    const notApprovedChildren = isPending ? (
      <Spinner color="neutral.100" />
    ) : NotApproveRender ? (
      <NotApproveRender />
    ) : (
      <Box>Unlock token</Box>
    )
    const childrenElement = isApproved ? children : notApprovedChildren

    const wrappedComponentProps = {
      ...omit(props, [
        'tokenAddress',
        'spender',
        'requiredAllowance',
        'NFTWalletAddress',
      ]),
      onClick: handleClick,
      children: childrenElement,
      isDisabled,
      isLoading: isPending,
    }

    return <WrappedComponent {...wrappedComponentProps} />
  }

  ComponentWithTokenApproval.displayName = `WithTokenApproval(${displayName})`
  return ComponentWithTokenApproval
}
