import { asObject } from "app/common/runtimeTypes"
import { ipcRendererFactory } from "test/__stubs__/ipcRenderer"
import { jsonSerializer } from "test/__stubs__/serializers"
import * as api from "app/renderer/api"
import { routes } from "app/main/api"
import { GetWalletSuccess, GetWalletResponse } from "app/common/runtimeTypes/ipc/wallets"
import { CURRENT_WALLET_VERSION } from "app/common/runtimeTypes/storage/wallets"

describe("GetWallet API", () => {
  const getWalletParams = {
    id: "1",
    password: "test-pwd"
  }

  const wallet: GetWalletSuccess = {
    kind: "SUCCESS",
    wallet: {
      _v: CURRENT_WALLET_VERSION,
      id: "test",
      caption: "test wallet",
      seed: {
        mnemonics: "",
        kind: "Wip3",
        seed: { masterSecret: Buffer.from(""), chainCode: Buffer.from("") }
      },
      epochs: { last: 0 },
      purpose: 0x80000003,
      accounts: []
    }
  }

  const messageHandler = jest.fn()
  messageHandler.mockResolvedValue(asObject(wallet, GetWalletResponse))
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

  // it("should be able to do balahablah", async () => {

  //   const walletResponseFixture: GetWalletResponse = {
  //     kind: "SUCCESS",
  //     wallet: {
  //       _v: CURRENT_WALLET_VERSION,
  //       id: "test",
  //       caption: "test wallet",
  //       seed: {
  //         mnemonics: "",
  //         kind: "Wip3",
  //         seed: { masterSecret: Buffer.from(""), chainCode: Buffer.from("") }
  //       },
  //       epochs: { last: 0 },
  //       purpose: 0x80000003,
  //       accounts: []
  //     }
  //   }

  //   const walletResponse = asObject(walletResponseFixture, GetWalletResponse)
  //   expect(asRuntimeType(walletResponse, GetWalletResponse)).toMatchObject(walletResponseFixture)

  //   const messageHandler = jest.fn()
  //   messageHandler.mockResolvedValue(walletResponseFixture)
  //   const options = {
  //     ...api.defaultOptions,
  //     timeout: 0,
  //     idGen: () => "some generated id",
  //     json: jsonSerializer,
  //     ipc: ipcRendererFactory(),
  //     messageHandler
  //   }
  //   const client = new api.Client(options)
  //   const response = await api.getWallet(client, getWalletParams.id, getWalletParams.password)
  //   // console.log(response)
  //   expect(response).toMatchObject(walletResponseFixture)

  // })

})