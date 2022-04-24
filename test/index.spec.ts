import {
  createJsonRpcClient,
  createRequestHandler,
  JsonRpcRequest,
} from '../src'
import { EventEmitter } from 'events'
import { createEventSender } from './createEventSender'

export interface TestApi {
  sum: (x: number, y: number) => number
  increaseAsync: (x: number) => number
  error: () => void
}

const requestHandler = createRequestHandler<TestApi>({
  increaseAsync: (x) => {
    return delay(x + 1, 100)
  },
  sum: (x, y) => x + y,
  error: () => {
    throw ErrorText
  },
})

const emitter = new EventEmitter()

emitter.on('request', (request: JsonRpcRequest) => {
  void (async () => {
    const response = await requestHandler.handleRequest(request)
    emitter.emit('response', response)
  })()
})

const eventSender = createEventSender(emitter)

const ErrorText = 'Error!'

function delay<T>(value: T, ms: number) {
  return new Promise<T>((resolve) => setTimeout(() => resolve(value), ms))
}

const client = createJsonRpcClient<TestApi>(eventSender)

it('Client requests', async () => {
  const results = await Promise.all([
    client.increaseAsync(100),
    client.sum(200, 300),
    client.sum(400, 500),
    client.increaseAsync(600),
  ])
  expect(results).toEqual([101, 500, 900, 601])
})

it('Request with error', async () => {
  try {
    await client.error()
  } catch (error) {
    expect(error).toEqual(ErrorText)
  }
})
