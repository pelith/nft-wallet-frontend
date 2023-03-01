import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

import { isAddress } from '@/utils/web3Utils'

interface IHistoryState {
  history: { ts: number; hash: string }[]
  addHistory(historyHash: string): void
}

export const useTransactionHistoryStore = create(
  immer<IHistoryState>((set) => ({
    history: [],
    addHistory(historyHash: string) {
      if (isAddress(historyHash)) {
        set((state) => {
          state.history.push({
            ts: Date.now(),
            hash: historyHash,
          })
        })
      }
    },
  })),
)

export function addTransactionHistory(hash: string) {
  useTransactionHistoryStore.getState().addHistory(hash)
}
