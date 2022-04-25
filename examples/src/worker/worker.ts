import { JsonRpcRequest, createRequestHandler } from 'typed-json-rpc'
import { Api } from '../api'

const requestHandler = createRequestHandler<Api>({
  increase: (x) => {
    return x + 1
  },
  sum: (x, y) => x + y,
})

self.addEventListener(
  'message',
  async (event: MessageEvent<JsonRpcRequest>) => {
    const request = event.data
    const response = await requestHandler.handleRequest(request)
    self.postMessage(response)
  },
)
