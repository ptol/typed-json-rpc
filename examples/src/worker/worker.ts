import { JsonRpcRequest } from "typed-json-rpc";
import { requestHandler } from "../api";

self.addEventListener(
  'message',
  async (event: MessageEvent<JsonRpcRequest>) => {
    const request = event.data
    const response = await requestHandler.handleRequest(request)
    self.postMessage(response)
  },
)
