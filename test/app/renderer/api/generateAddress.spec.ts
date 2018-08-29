import { asObject } from "app/common/runtimeTypes"
import { ipcRendererFactory } from "test/__stubs__/ipcRenderer"
import { jsonSerializer } from "test/__stubs__/serializers"
import * as api from "app/renderer/api"
//import { routes } from "app/main/api"
import { GenerateAddressParams, GenerateAddressSuccess } from "app/common/runtimeTypes/ipc/address"

describe("GenerateAddress API", () => {
  // Params
  const generateAddressParams: GenerateAddressParams = {
    account: 0,
    label: "From Satoshi Nakamoto",
    amount: 1,
    expirationDate: 1526342400  // May 15, 2018
  }

  // Response
  const generateAddressSuccess: GenerateAddressSuccess = {
    kind: "SUCCESS",
    key: {
      kind: "external",
      extendedKey: {
        chainCode: Buffer.from("f55975c2fda883d73495932af3974762003dfd715505ea262b1fa3105e157e04"),
        key: Buffer.from("03c0f6ca4b6e580687b955f49705479e0e59e0072db58abdc465c7628582507d54"),
        type: "public"
      },
      keyPath: [2147483651, 2147488567, 2147483648, 0, 0],
      pkh: Buffer.from("1c31abe5cefb699ec7a787d3ad1f1105ee851a2e"),
      metadata: {
        creationDate: 0,
        requestedAmount: 20,
        expirationDate: 1
      }
    }
  }

  // Mock response
  const messageHandler = jest.fn()
  messageHandler.mockResolvedValue(asObject(generateAddressSuccess, GenerateAddressSuccess))

  // Build API client with mocked response
  const options = {
    ...api.defaultOptions,
    timeout: 0,
    idGen: () => "some generated id",
    json: jsonSerializer,
    ipc: ipcRendererFactory(),
    messageHandler
  }
  const client = new api.Client(options)

  it("should return a valid address", async () => {
    // Call generateAddress renderer function to trigger a
    // JSON-RPC request and wait for the response
    const response = await api.generateAddress(
      client,
      generateAddressParams.account,
      generateAddressParams.label,
      generateAddressParams.amount,
      generateAddressParams.expirationDate
    )

    // Check that mocked response was returned correctly
    expect(response).toMatchObject(generateAddressSuccess)
  })

  // Check that requested method is routed to a backend handler
  it("should send a routable JSON-RPC request", async () => {
    const expected = {
      jsonrpc: "2.0",
      id: "some generated id",
      method: "generateAddress",
      params: generateAddressParams
    }

    // Call generateAddress renderer function to trigger a
    // JSON-RPC request and wait for the response
    await api.generateAddress(
      client,
      generateAddressParams.account,
      generateAddressParams.label,
      generateAddressParams.amount,
      generateAddressParams.expirationDate
    )

    // Check that the requested method is in the routes of the main process
    // TODO: uncomment when issue #391 is done (backend handler is implemented)
    //expect(messageHandler.mock.calls[0][1].method in routes).toBe(true)

    // Check that the message handler function has been called correctly
    expect(messageHandler).toBeCalledWith(jsonSerializer, expected)
  })
})
