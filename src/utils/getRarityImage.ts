export default function getRarityImage(data: string) {
  const [mediaType, base64Data] = data.split(',')
  if (mediaType === 'data:application/json;base64') {
    try {
      const _data = JSON.parse(window.atob(base64Data)) as {
        image: string
        name: string
        description: string
      }
      return _data.image
    } catch (error) {
      console.error(error)
      return ''
    }
  }

  return ''
}
