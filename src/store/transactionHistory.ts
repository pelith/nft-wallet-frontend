import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

interface IHistoryState {
  history: { ts: number; hash: string }[]
}

export const useTransactionHistoryStore = create(
  immer<IHistoryState>(() => ({
    history: [],
  })),
)
