export default function getIPFSImage(id: number) {
  return `${import.meta.env.VITE_APP_IPFS_BASE_URL}${id}.jpg`
}
