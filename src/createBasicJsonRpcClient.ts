import { Func, RequestParams, RequestSender, ResponseParams } from './types'
import { createJsonRpcRequest } from './createJsonRpcRequest'

interface BasicJsonRpcClient<T extends { [P in keyof T]: Func }> {
  send: <K extends keyof T>(
    action: K,
    ...payload: RequestParams<T[K]>
  ) => Promise<ResponseParams<T[K]>>
}

export const createBasicJsonRpcClient = <T extends { [P in keyof T]: Func }>(
  client: RequestSender,
): BasicJsonRpcClient<T> => ({
  send: (action, ...payload) => {
    const request = createJsonRpcRequest<T>()(action, ...payload)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return client.sendRequest(request)
  },
})
