import { JsonRpcRequest, JsonRpcResponse, RequestSender } from 'typed-json-rpc'
import axios, { AxiosResponse } from 'axios'

export const createHttpSender = (): RequestSender => ({
  sendRequest(request: JsonRpcRequest) {
    return axios
      .post<JsonRpcResponse, AxiosResponse<JsonRpcResponse>>(
        'http://localhost:9000',
        request,
      )
      .then((x) =>
        'error' in x.data ? Promise.reject(x.data.error) : x.data.result,
      )
  },
})
