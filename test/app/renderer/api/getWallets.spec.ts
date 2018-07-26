/* tslint:disable:no-null-keyword */

import { ipcRendererFactory } from "test/__stubs__/ipcRenderer"
import { jsonSerializer } from "test/__stubs__/serializers"
import * as api from "app/renderer/api"
import { routes } from "app/main/api"

describe("GetWallets API", () => {
  const wallets = [
    { id: "1", caption: "My hot wallet" },
    { id: "2", caption: "My TREZOR cold wallet" }
  ]
  const messageHandler = jest.fn()
  messageHandler.mockResolvedValue(wallets)
  const options = {
    ...api.defaultOptions,
    timeout: 0,
    idGen: () => "some generated id",
    json: jsonSerializer,
    ipc: ipcRendererFactory(),
    messageHandler
  }
  const client = new api.Client(options)

  it("should return valid wallets", async () => {
    const response = await api.getWallets(client)
    expect(response).toMatchObject(wallets)
  })

  it("should send a routable JSON-RPC request", async () => {
    const expected = {
      jsonrpc: "2.0",
      id: "some generated id",
      method: "getWallets",
      params: null
    }

    // Call getWallets renderer function to trigger a JSON-RPC request and
    // wait for the response
    await api.getWallets(client)

    // Check that the requested method is in the routes of the main process
    expect(messageHandler.mock.calls[0][1].method in routes).toBe(true)

    // Check that the message handler function has been called correctly
    expect(messageHandler).toBeCalledWith(jsonSerializer, expected)
  })

})