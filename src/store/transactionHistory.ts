import { createStore } from '@udecode/zustood'

type HistoryItem = {
  ts: number
  hash: string
}

export const transactionHistoryStore = createStore('transactionHistory')({
  history: new Map<string, HistoryItem[]>(),
}).extendActions((set) => ({
  addTransactionHistory(nftAddress: string, nftId: number, hash: string) {
    const key = `${nftAddress}/${nftId}`
    set.state((draft) => {
      if (draft.history.get(key)) {
        draft.history.get(key)?.push({
          ts: Date.now(),
          hash,
        })
      } else {
        draft.history.set(key, [{ ts: Date.now(), hash }])
      }
    })
  },
}))

export const { useStore: useTransactionHistoryStore } = transactionHistoryStore
