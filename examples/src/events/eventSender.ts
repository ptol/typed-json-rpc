import { JsonRpcResponse, RequestSender } from 'typed-json-rpc'
import { EventEmitter } from 'events'

export const createEventSender = (emitter: EventEmitter): RequestSender => ({
  sendRequest(request) {
    return new Promise<JsonRpcResponse>((resolve, reject) => {
      const listener = (response: JsonRpcResponse) => {
        if (response.id === request.id) {
          emitter.off('response', listener)
          if ('error' in response) {
            reject(response.error)
          } else {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            resolve(response.result)
          }
        }
      }
      emitter.on('response', listener)
      emitter.emit('request', request)
    })
  },
})
