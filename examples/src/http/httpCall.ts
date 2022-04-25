import { Api } from '../api'
import { createJsonRpcClient } from 'typed-json-rpc'
import { createHttpSender } from './httpSender'

const sender = createHttpSender()
const client = createJsonRpcClient<Api>(sender)
void (async () => {
  const result = await client.sum(2, 3)
  console.log('Result: ', result)
})()
