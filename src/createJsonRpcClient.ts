import { createBasicJsonRpcClient } from './createBasicJsonRpcClient'
import { Func, Promisify, RequestSender } from './types'

type JsonRpcClient<F extends { [key in string]: Func }> = {
  [key in keyof F]: Promisify<F[key]>
}

export const createJsonRpcClient = <T extends { [P in keyof T]: Func }>(
  client: RequestSender,
): JsonRpcClient<T> => {
  const basicClient = createBasicJsonRpcClient<T>(client)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return new Proxy(basicClient, {
    get: (target, methodOrAttributeName) => {
      return (...rest: any) => {
        return target.send(
          methodOrAttributeName as keyof T,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          ...rest,
        )
      }
    },
  }) as any
}
