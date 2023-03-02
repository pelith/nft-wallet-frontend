import cond from 'lodash/cond'
import constant from 'lodash/constant'
import eq from 'lodash/fp/eq'
import stubTrue from 'lodash/stubTrue'

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

export const statusValidate = cond<string, string | false>([
  [eq('success'), constant('success')],
  [eq('loading'), constant('loading')],
  [eq('error'), constant('error')],
  [stubTrue, constant(false)],
])

function getCommonDecimal(amount: number) {
  if (amount < 1) return 6
  if (amount < 10) return 5
  if (amount < 100) return 4
  if (amount < 1000) return 3
  return 2
}

function formatNumberWithCommas(n: number) {
  const parts = n.toString().split('.')
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return parts.join('.')
}

export function formatNumber(amount: number | string | undefined, toFixedValue?: number) {
  const processAmount = typeof amount === 'string' ? parseFloat(amount) : amount
  if (processAmount == null || isNaN(processAmount)) {
    return '-'
  } else {
    return toFixedValue
      ? formatNumberWithCommas(parseFloat(processAmount.toFixed(toFixedValue)))
      : formatNumberWithCommas(processAmount)
  }
}

export function formatCommonNumber(amount: number | string | undefined) {
  const processAmount = typeof amount === 'string' ? parseFloat(amount) : amount
  if (processAmount == null || isNaN(processAmount)) {
    return '-'
  }
  if (processAmount === 0) return '0'
  if (processAmount < 0.000001) return '<0.000001'
  return formatNumber(processAmount, getCommonDecimal(processAmount))
}
