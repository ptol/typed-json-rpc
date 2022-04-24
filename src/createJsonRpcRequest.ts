import { JsonRpcRequest, RequestParams } from './types'

let globalRequestId = 1

export const createJsonRpcRequest =
  <T extends { [P in keyof T]: any }>() =>
  <K extends keyof T>(
    action: K,
    ...payload: RequestParams<T[K]>
  ): JsonRpcRequest => {
    const currentRequestId = globalRequestId
    globalRequestId += 1
    return {
      jsonrpc: '2.0',
      method: action as string,
      params: payload,
      id: currentRequestId,
    }
  }
