import * as api from "../../../app/renderer/new_api"
import { DataRequest } from "../../../app/common/runtimeTypes/wallet"
import { asRuntimeType } from "../../../app/common/runtimeTypes"

describe("create Data Request method", () => {
  it("should request createDataRequest method and return value", async () => {
    const args = {
      notBefore: 6,
      retrieve: [{ kind: "Int", url: "xd", script: [1] }],
      aggregate: { script: [0, 0, 0] },
      consensus: { script: [0, 0, 0] },
      deliver: [{ kind: "Int", url: "lol" }],
    }

    const mockValue = { dataRequest: "asfg" }

    const mockClient = {
      withOptions: jest.fn((opts: Partial<api.Options>) => api.Client),
      notify: jest.fn((method: api.ApiMethod, args: api.MethodArgs) => { }),
      /* eslint-disable no-new */
      request: jest.fn((method: api.ApiMethod, args: api.MethodArgs) => { new Promise(() => {}) })
        .mockReturnValueOnce(new Promise((resolve, reject) => resolve(mockValue))),
      subscribe: jest.fn((method: api.ApiMethod, args: api.MethodArgs) => { new Promise(() => {}) }),
      unsubscribe: jest.fn((method: api.ApiMethod, args: api.MethodArgs) => { new Promise(() => {}) }),
    }

    const expected = asRuntimeType(mockValue.dataRequest, DataRequest)
    const result = await api.createDataRequest(mockClient, args)

    expect(mockClient.request).toBeCalledWith("createDataRequest", args)
    expect(result).toEqual(expected)
  })
})
