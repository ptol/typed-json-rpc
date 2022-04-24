# typed-json-rpc


>Simple, strongly typed and ergonomic way to do any async communication (events, workers, http requests) with json-rpc 

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

## Create your API request handler

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
const client = createJsonRpcClient<TestApi>(sender)
```

## And call your API
```typescript
const x = await client.increase(100)
const y = await client.sum(1,2)
```

