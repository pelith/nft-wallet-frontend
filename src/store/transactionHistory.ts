import { createStore } from '@udecode/zustood'

type HistoryItem = {
  ts: number
  hash: string
}

export const transactionHistoryStore = createStore('transactionHistory')({
  history: new Map<`0x${string}`, HistoryItem[]>(),
}).extendActions((set) => ({
  addTransactionHistory(nftWalletAddress: `0x${string}`, hash: string) {
    set.state((draft) => {
      if (draft.history.get(nftWalletAddress)) {
        draft.history.get(nftWalletAddress)?.push({
          ts: Date.now(),
          hash,
        })
      } else {
        draft.history.set(nftWalletAddress, [{ ts: Date.now(), hash }])
      }
    })
  },
}))

export const { useStore: useTransactionHistoryStore } = transactionHistoryStore
