import {
  Handlers,
  JsonRpcRequest,
  JsonRpcResponse,
  RequestHandler,
} from './types'

export const createRequestHandler = <T extends { [key: string]: any }>(
  handlers: Handlers<T>,
): RequestHandler => {
  return {
    handleRequest: async (request: JsonRpcRequest) => {
      try {
        const result = (await handlers[request.method](
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          ...request.params,
        )) as Promise<any>
        const response: JsonRpcResponse = {
          jsonrpc: '2.0',
          id: request.id,
          result,
        }
        return response
      } catch (error) {
        const response: JsonRpcResponse = {
          jsonrpc: '2.0',
          id: request.id,
          error,
        }
        return response
      }
    },
  }
}
