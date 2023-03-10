/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_APP_LOCAL_NFT_FACTORY: `0x${string}`
  VITE_APP_SAMPLE_NFT_ADDRESS: `0x${string}`
  VITE_APP_CHAIN: string
  VITE_APP_IS_DEV: boolean
}
