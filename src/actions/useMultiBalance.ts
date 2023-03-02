import { formatUnits } from '@ethersproject/units'
import { BigNumber } from 'ethers'
import chunk from 'lodash/chunk'
import { useMemo } from 'react'
import { useBalance, useBlockNumber, useChainId, useQuery, useQueryClient } from 'wagmi'
import { ContractResultDecodeError, erc20ABI, readContracts } from 'wagmi'
import { FetchBalanceArgs, FetchBalanceResult } from 'wagmi/actions'
interface MultiFetchProps extends Omit<FetchBalanceArgs, 'token'> {
  tokens: `0x${string}`[]
}

type UseMultiBalanceProps = Exclude<Parameters<typeof useBalance>[0], undefined> & {
  tokens: `0x${string}`[]
  token?: undefined
}

export default function useMultiBalance({
  address,
  cacheTime,
  chainId: chainId_,
  enabled = true,
  formatUnits,
  scopeKey,
  staleTime,
  suspense,
  tokens,
  watch,
  onError,
  onSettled,
  onSuccess,
}: UseMultiBalanceProps) {
  const chainId = useChainId({ chainId: chainId_ })
  const queryKey_ = useMemo(
    () => queryKey({ address, chainId, formatUnits, scopeKey, tokens }),
    [address, chainId, formatUnits, scopeKey, ...tokens],
  )
  const balanceQuery = useQuery(queryKey_, queryFn, {
    cacheTime,
    enabled: Boolean(enabled && address),
    staleTime,
    suspense,
    onError,
    onSettled,
    onSuccess,
  })

  const enabled_ = Boolean(enabled && watch && address)

  const queryClient = useQueryClient()
  useBlockNumber({
    chainId,
    enabled: enabled_,
    onBlock: enabled_ ? () => queryClient.invalidateQueries(queryKey_) : undefined,
    scopeKey: enabled_ ? undefined : 'idle',
  })
  return balanceQuery
}

function queryKey({ address, chainId, formatUnits, scopeKey, tokens }: any) {
  return [
    {
      entity: 'balance',
      address,
      chainId,
      formatUnits,
      scopeKey,
      tokens,
    },
  ] as const
}
function queryFn({ queryKey: [{ address, chainId, formatUnits, tokens }] }: any) {
  if (!address) throw new Error('address is required')
  return fetchMultiChainBalance({ address, chainId, formatUnits, tokens })
}

async function fetchMultiChainBalance({
  address,
  chainId,
  formatUnits: unit,
  tokens = [],
}: MultiFetchProps): Promise<FetchBalanceResult[]> {
  if (tokens.length) {
    type FetchContractBalance = {
      abi: typeof erc20ABI
    }

    const fetchContractsBalance = async ({ abi }: FetchContractBalance) => {
      const erc20Config = { abi, chainId } as const

      const chunkOfReader = await readContracts({
        allowFailure: false,
        contracts: tokens
          .map(
            (tokenAddress) =>
              [
                {
                  ...erc20Config,
                  address: tokenAddress,
                  functionName: 'balanceOf',
                  args: [address],
                },
                {
                  ...erc20Config,
                  address: tokenAddress,
                  functionName: 'decimals',
                },
                {
                  ...erc20Config,
                  address: tokenAddress,
                  functionName: 'symbol',
                },
              ] as const,
          )
          .flat(),
      })

      return chunk(chunkOfReader, 3).map(([value, decimals, symbol]) => ({
        decimals: decimals as number,
        formatted: formatUnits(value ?? '0', unit ?? decimals),
        symbol: symbol as string,
        value: value as BigNumber,
      }))
    }

    try {
      return await fetchContractsBalance({ abi: erc20ABI })
    } catch (error) {
      if (error instanceof ContractResultDecodeError) {
        console.error('contract decode error')
      }
      throw error
    }
  }

  return []
}
