import * as api from "../../../app/renderer/new_api"
import { Wallet } from "../../../app/common/runtimeTypes/wallet"
import { asRuntimeType } from "../../../app/common/runtimeTypes"

describe("create Wallet method", () => {
  it("should request create Wallet method and return value", async () => {
    const params = {
      name: "asdf",
      password: "asdf",
    }

    const mockApiResponse = {
      wallet: {
        version: 10,
        info: { id: "asd", caption: "asdf" },
        seed: { seed: [0, 0, 0] },
        epochs: { last: 0, born: 0 },
        purpose: "asf",
        accounts: [{
          keyPath: [0, 0, 0],
          keyChains: [],
          balance: 0,
        }],
      } }

    const mockClient = {
      withOptions: jest.fn((opts: Partial<api.Options>) => api.Client),
      notify: jest.fn((method: api.ApiMethod, args: api.MethodArgs) => { }),
      /* eslint-disable no-new */
      request: jest.fn((method: api.ApiMethod, args: api.MethodArgs) => { new Promise(() => {}) })
        .mockReturnValueOnce(new Promise((resolve, reject) => resolve(mockApiResponse))),
      subscribe: jest.fn((method: api.ApiMethod, args: api.MethodArgs) => { new Promise(() => {}) }),
      unsubscribe: jest.fn((method: api.ApiMethod, args: api.MethodArgs) => { new Promise(() => {}) }),
    }

    const expected = asRuntimeType(mockApiResponse.wallet, Wallet)
    const result = await api.createWallet(mockClient, params)

    expect(mockClient.request).toBeCalledWith("createWallet", params)
    expect(result).toBe(expected)
  })
})
