import * as api from "../../../app/renderer/new_api"
import { WalletInfo } from "../../../app/common/runtimeTypes/wallet"
import { asRuntimeType } from "../../../app/common/runtimeTypes"

describe("Get Wallet Infos method", () => {
  it("should request getWalletInfos method and return value", async () => {
    const handleResponseMockValue = {
      walletInfos: {
        id: "asf",
        caption: "asf",
      },
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
    const expected = asRuntimeType(handleResponseMockValue.walletInfos, WalletInfo)
    const result = await api.getWalletInfos(mockClient)

    expect(mockClient.request).toBeCalledWith("getWalletInfos")
    expect(result).toBe(expected)
  })
})
