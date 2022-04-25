import { createJsonRpcClient, JsonRpcRequest } from 'typed-json-rpc'
import { EventEmitter } from 'events'
import { createEventSender } from './eventSender'
import { Api, requestHandler } from '../api'

const emitter = new EventEmitter()

emitter.on('request', (request: JsonRpcRequest) => {
  void (async () => {
    const response = await requestHandler.handleRequest(request)
    emitter.emit('response', response)
  })()
})

const eventSender = createEventSender(emitter)

const client = createJsonRpcClient<Api>(eventSender)

void (async () => {
  const result = await client.sum(2, 3)
  console.log('Result: ', result)
})()
