import * as api from "../../../app/renderer/new_api"
import { Mnemonics } from "../../../app/common/runtimeTypes/wallet"
import { asRuntimeType } from "../../../app/common/runtimeTypes"

describe("create Mnemonics method", () => {
  it("should request createMnemonics method and return value", async () => {
    const params = { mnemonics: { mnemonics: "asf" } }

    const handleResponseMockValue = { mnemonics: { mnemonics: "asf" } }

    const mockClient = {
      withOptions: jest.fn((opts: Partial<api.Options>) => api.Client),
      notify: jest.fn((method: api.ApiMethod, args: api.MethodArgs) => { }),
      /* eslint-disable no-new */
      request: jest.fn((method: api.ApiMethod, args: api.MethodArgs) => { new Promise(() => {}) })
        .mockReturnValueOnce(new Promise((resolve, reject) => resolve(handleResponseMockValue))),
      subscribe: jest.fn((method: api.ApiMethod, args: api.MethodArgs) => { new Promise(() => {}) }),
      unsubscribe: jest.fn((method: api.ApiMethod, args: api.MethodArgs) => { new Promise(() => {}) }),
    }

    const expected = asRuntimeType(handleResponseMockValue, Mnemonics)
    const result = await api.createMnemonics(mockClient, params)

    expect(mockClient.request).toBeCalledWith("createMnemonics", params)
    expect(result).toEqual(expected)
  })
})
