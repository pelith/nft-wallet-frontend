import { Box, ButtonProps, Spinner } from '@chakra-ui/react'
import { BigNumber } from 'ethers'
import omit from 'lodash/omit'
import type { ComponentType } from 'react'

import { ApprovalState } from '@/constants/ApprovalState'
import useTokenApprove from '@/hooks/useTokenApprove'
export interface ApproveTokenCheckWrapperInterface extends ButtonProps {
  tokenAddress: string
  spender: string
  requiredAllowance: BigNumber
}
export default function withApproveTokenCheckWrapper<
  T extends ApproveTokenCheckWrapperInterface,
>(WrappedComponent: ComponentType<ButtonProps>) {
  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component'

  const ComponentWithTokenApproval = (props: T) => {
    const { tokenAddress, spender, requiredAllowance, onClick, children, disabled } =
      props

    const { approve, approvalState } = useTokenApprove({
      tokenAddress: tokenAddress as `0x${string}`,
      requiredAllowance,
      walletAddress: spender as `0x${string}`,
    })

    const isPending = approvalState === ApprovalState.LOADING
    const isApproved = approvalState === ApprovalState.APPROVED
    const isDisabled = isApproved ? disabled : isPending
    const handleClick = isApproved ? onClick : approve
    const notApprovedChildren = isPending ? (
      <Spinner color="neutral.100" />
    ) : (
      <Box>unlock token</Box>
    )
    const childrenElement = isApproved ? children : notApprovedChildren

    const wrappedComponentProps = {
      ...omit(props, ['tokenAddress', 'spender', 'requiredAllowance']),
      onClick: handleClick,
      children: childrenElement,
      disabled: isDisabled,
    }

    return <WrappedComponent {...wrappedComponentProps} />
  }

  ComponentWithTokenApproval.displayName = `WithTokenApproval(${displayName})`
  return ComponentWithTokenApproval
}
