export const cutInputToDecimal = (input: string, decimals?: number) => {
  if (!decimals) {
    return input
  }
  const inputArray = input.split('.')
  if (!inputArray[1]) {
    return input
  }
  const newInput = inputArray[0] + '.' + inputArray[1].slice(0, decimals)
  return newInput
}

export function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // $& means the whole matched string
}