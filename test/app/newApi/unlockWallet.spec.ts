import * as api from "../../../app/renderer/new_api"
import { Wallet } from "../../../app/common/runtimeTypes/wallet"
import { asRuntimeType } from "../../../app/common/runtimeTypes"

describe("Import Seed method", () => {
  it("should request Import method and return value", async () => {
    const params = {
      id: "Int",
      password: "lol",
    }

    const handleResponseMockValue = {
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
    }

    const mockClient = {
      withOptions: jest.fn((opts: Partial<api.Options>) => api.Client),
      notify: jest.fn((method: api.ApiMethod, args: api.MethodArgs) => { }),
      /* eslint-disable no-new */
      request: jest.fn((method: api.ApiMethod, args: api.MethodArgs) => { new Promise(() => {}) })
        .mockReturnValueOnce(new Promise((resolve, reject) => resolve(handleResponseMockValue))),
      subscribe: jest.fn((method: api.ApiMethod, args: api.MethodArgs) => { new Promise(() => {}) }),
      unsubscribe: jest.fn((method: api.ApiMethod, args: api.MethodArgs) => { new Promise(() => {}) }),
    }

    const expected = asRuntimeType(handleResponseMockValue, Wallet)

    const result = await api.unlockWallet(mockClient, params)

    expect(mockClient.request).toBeCalledWith("unlockWallet", params)
    expect(result).toEqual(expected)
  })
})
