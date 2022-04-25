import { JsonRpcResponse, RequestSender } from 'typed-json-rpc'

export const createWorkerSender = (worker: Worker): RequestSender => ({
  sendRequest(request) {
    return new Promise<JsonRpcResponse>((resolve, reject) => {
      const listener = (event: MessageEvent<JsonRpcResponse>) => {
        const response = event.data
        if (response.id === request.id) {
          worker.removeEventListener('message', listener)
          if ('error' in response) {
            reject(response.error)
          } else {
            resolve(response.result)
          }
        }
      }
      worker.addEventListener('message', listener)
      worker.postMessage(request)
    })
  },
})
