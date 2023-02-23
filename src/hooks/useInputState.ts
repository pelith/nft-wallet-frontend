import get from 'lodash/fp/get'
import pipe from 'lodash/fp/pipe'
import { FormEvent, useState } from 'react'
const typed = (e: FormEvent<HTMLInputElement>) => e
export default function useInputState<T>(value: T) {
  const [state, setState] = useState<T>(value)

  return [state, pipe(typed, get(['e', 'currentTarget', 'value']), setState)] as const
}
