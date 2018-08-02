import { ipcRendererFactory } from "test/__stubs__/ipcRenderer"
import { jsonSerializer } from "test/__stubs__/serializers"
import * as api from "app/renderer/api"
import { routes } from "app/main/api"
import { GetWalletSuccess } from "app/common/runtimeTypes/ipc/wallets"
import { CURRENT_WALLET_VERSION } from "app/common/runtimeTypes/storage/wallets"

describe("GetWallet API", () => {
  const getWalletParams = {
    id: "1",
    password: "test-pwd"
  }

  const wallet: GetWalletSuccess = {
    kind: "success",
    wallet: {
      _v: CURRENT_WALLET_VERSION,
      id: "test",
      caption: "test wallet",
      seed: { kind: "Wip3", mnemonics: { mnemonics: "" }, xprv: "", xpub: "" },
      epochs: { last: 0 },
      purpose: 0x80000003,
      accounts: []
    }
  }

  const messageHandler = jest.fn()
  messageHandler.mockResolvedValue(wallet)
  const options = {
    ...api.defaultOptions,
    timeout: 0,
    idGen: () => "some generated id",
    json: jsonSerializer,
    ipc: ipcRendererFactory(),
    messageHandler
  }
  const client = new api.Client(options)

  it("should return a valid wallet", async () => {
    const response = await api.getWallet(client, getWalletParams.id, getWalletParams.password)
    expect(response).toMatchObject(wallet)
  })

  it("should send a routable JSON-RPC request", async () => {
    const expected = {
      jsonrpc: "2.0",
      id: "some generated id",
      method: "getWallet",
      params: getWalletParams
    }

    // Call getWallet renderer function to trigger a JSON-RPC request and
    // wait for the response
    await api.getWallet(client, getWalletParams.id, getWalletParams.password)

    // Check that the requested method is in the routes of the main process
    expect(messageHandler.mock.calls[0][1].method in routes).toBe(true)

    // Check that the message handler function has been called correctly
    expect(messageHandler).toBeCalledWith(jsonSerializer, expected)
  })

})