import { createRequestHandler } from 'typed-json-rpc'

export interface Api {
  sum: (x: number, y: number) => number
  increase: (x: number) => number
}

export const requestHandler = createRequestHandler<Api>({
  increase: (x) => {
    return x + 1
  },
  sum: (x, y) => x + y,
})
