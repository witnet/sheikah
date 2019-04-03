import * as api from "../../../app/renderer/new_api"
import { asRuntimeType } from "../../../app/common/runtimeTypes"
import { Address } from "../../../app/common/runtimeTypes/wallet"
describe("Generate Address method", () => {
  it("should request Generate Address method and return value", async () => {
    const args = {
      walletId: "idwallet",
    }

    const mockValue = { address: "fabada" }
    const mockClient = {
      withOptions: jest.fn((opts: Partial<api.Options>) => api.Client),
      notify: jest.fn((method: api.ApiMethod, args: api.MethodArgs) => { }),
      /* eslint-disable no-new */
      request: jest.fn((method: api.ApiMethod, args: api.MethodArgs) => { new Promise(() => {}) })
        .mockReturnValueOnce(new Promise((resolve, reject) => resolve(mockValue))),
      subscribe: jest.fn((method: api.ApiMethod, args: api.MethodArgs) => { new Promise(() => {}) }),
      unsubscribe: jest.fn((method: api.ApiMethod, args: api.MethodArgs) => { new Promise(() => {}) }),
    }

    const expected = asRuntimeType(mockValue.address, Address)
    const result = await api.generateAddress(mockClient, args)
    expect(mockClient.request).toBeCalledWith("generateAddress", args)
    expect(result).toEqual(expected)
  })
})
