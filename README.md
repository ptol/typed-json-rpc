# typed-json-rpc

>Simple, statically typed and ergonomic way to do async communications (events, workers, http requests) with json-rpc 

## Install

```bash
npm install typed-json-rpc
```

## Describe your API

```typescript
export interface Api {
  sum: (x: number, y: number) => number
  increase: (x: number) => number
}
```

## Create your API implementation as request handler

```typescript
const requestHandler = createRequestHandler<Api>({
  increase: (x) => {
    return x + 1
  },
  sum: (x, y) => x + y,
})
```

## Create a client
```typescript
const sender = createHttpSender()
const client = createJsonRpcClient<Api>(sender)
```

## And call your API
```typescript
const x = await client.increase(100)
const y = await client.sum(1,2)
```

> All this code can be used for any type of async communication. The difference is how you send your requests and responses.
 
## Http sender example
```typescript
export const createHttpSender = (url: string): RequestSender => ({
  sendRequest(request: JsonRpcRequest) {
    return axios
      .post<JsonRpcResponse, AxiosResponse<JsonRpcResponse>>(
        url,
        request,
      ).then((x) =>
        'error' in x.data ? Promise.reject(x.data.error) : x.data.result,
      )
  },
})
```

## Express responses

```typescript
app.post('/', async (req, res) => {
  const response = await requestHandler.handleRequest(req.body)
  return res.status(200).json(response)
})

```

## [Full http example](https://github.com/ptol/typed-json-rpc/tree/main/examples/src/http)

## Worker and EventEmitter examples

* [Worker example](https://github.com/ptol/typed-json-rpc/tree/main/examples/src/worker)
* [EventEmitter example](https://github.com/ptol/typed-json-rpc/tree/main/examples/src/events)

