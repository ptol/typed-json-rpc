export type Func<TS extends any[] = any[], R = any> = (...args: TS) => R
export type RequestParams<T extends Func> = Parameters<T>
export type ResponseParams<T extends Func> = ReturnType<T>

export interface JsonRpcRequest {
  jsonrpc: '2.0'
  id: number
  method: string
  params: any
}

export type JsonRpcResponse =
  | {
      jsonrpc: '2.0'
      id: number
      result: any
    }
  | {
      jsonrpc: '2.0'
      id: number
      error: any
    }

export interface RequestSender {
  sendRequest: (request: JsonRpcRequest) => Promise<any>
}

export interface RequestHandler {
  handleRequest: (request: JsonRpcRequest) => Promise<JsonRpcResponse>
}

export type Promisify<T> = T extends Func<infer A, infer R>
  ? (...args: A) => R extends Promise<any> ? R : Promise<R>
  : never

export type Handler<T extends Func> = (
  ...payload: RequestParams<T>
) => Promise<ResponseParams<T>> | ResponseParams<T>

export type Handlers<T extends Record<string, Func>> = {
  [key in keyof T]: Handler<T[key]>
}

export type JsonRpcClient<F extends { [key in string]: Func }> = {
  [key in keyof F]: Promisify<F[key]>
}
