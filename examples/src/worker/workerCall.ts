import { createWorkerSender } from './workerSender.js'
import { Api } from '../api.js'
import { createJsonRpcClient } from 'typed-json-rpc'
import Worker from 'web-worker'

const worker = new Worker('./out/worker/worker.js')
const sender = createWorkerSender(worker)
const client = createJsonRpcClient<Api>(sender)
void (async () => {
  const result = await client.sum(2, 3)
  console.log('Result: ', result)
  worker.terminate()
})()
