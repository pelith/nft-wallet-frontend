import { Button } from '@chakra-ui/react'

import withApproveTokenCheckWrapper from '@/hoc/withApproveTokenCheckWrapper'

export const AuthApproveTokenButton = withApproveTokenCheckWrapper(Button)
